import React, { Component, Fragment, createRef, forwardRef } from 'react';
import PropTypes from 'prop-types';
import memorizeOne from 'memoize-one';
import { createPortal } from 'react-dom';
import { DEFAULT_PORTAL_ELM } from '../common/constants';
import asCustomElement from './asCustomElement';

function getServerNodes(selector) {
  // eslint-disable-next-line no-undef
  const nodes = document.querySelectorAll(selector);
  const nodeData = [];

  nodes.forEach((node) => {
    nodeData.push([
      node.innerHTML,
      node.getAttributeNames().reduce((memo, name) => {
        // eslint-disable-next-line no-param-reassign
        memo[name] = node.getAttribute(name);
        return memo;
      }, {}),
    ]);
  });

  return nodeData;
}

export default function toReact(
  WebComponent,
  { Portal = DEFAULT_PORTAL_ELM, toEventHandlerName, toAttributeName } = {},
) {
  const serverNodes = getServerNodes(WebComponent);

  class Wrapper extends Component {
    static displayName = `uwctr(${WebComponent})`;
    static propTypes = {
      children: PropTypes.node,
      forwardedRef: PropTypes.shape({
        current: PropTypes.any,
      }),
    };
    static defaultProps = {
      children: null,
      forwardedRef: createRef(),
    };
    constructor(props) {
      super(props);

      const serverNode = serverNodes.shift();

      if (!serverNode) {
        this.wcProps = {};
      } else {
        this.wcProps = {
          ...serverNode[1],
          dangerouslySetInnerHTML: {
            __html: serverNode[0],
          },
        };
      }
    }
    findPortal = memorizeOne((ref) => {
      const portal = ref.querySelector(Portal);

      while (portal.hasChildNodes()) {
        portal.removeChild(portal.lastChild);
      }

      return portal;
    });
    render() {
      const { forwardedRef, children, ...rest } = this.props;

      return (
        <Fragment>
          {forwardedRef.current &&
            createPortal(children, this.findPortal(forwardedRef.current))}
          <WebComponent {...rest} ref={forwardedRef} {...this.wcProps} />
        </Fragment>
      );
    }
  }

  return asCustomElement(
    forwardRef((props, ref) => {
      return <Wrapper {...props} forwardedRef={ref || undefined} />;
    }),
    {
      toEventHandlerName,
      toAttributeName,
    },
  );
}
