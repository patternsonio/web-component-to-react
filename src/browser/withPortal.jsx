/* eslint-env browser */

import React, { Component, Fragment, createRef } from 'react';
import PropTypes from 'prop-types';
import memorizeOne from 'memoize-one';
import { createPortal } from 'react-dom';
import { DEFAULT_PORTAL_ELM } from '../common/constants';
import namedForwardRef from './namedForwardRef';

function getServerNodes(selector) {
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
  { Portal = DEFAULT_PORTAL_ELM } = {},
) {
  const serverNodes = getServerNodes(WebComponent);

  return namedForwardRef(
    class extends Component {
      static displayName = `withPortal(${WebComponent})`;
      static propTypes = {
        hostProps: PropTypes.objectOf(PropTypes.any),
        forwardedRef: PropTypes.shape({
          current: PropTypes.any,
        }),
      };
      static defaultProps = {
        hostProps: {},
        forwardedRef: null,
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
      state = {};
      getRef = () => {
        return this.props.forwardedRef || this.ref;
      };
      setRef = (ref) => {
        this.getRef().current = ref;

        this.setState({
          portal: this.findPortal(ref),
        });
      };
      findPortal = memorizeOne((ref) => {
        const portal = ref.querySelector(Portal);

        while (portal.hasChildNodes()) {
          portal.removeChild(portal.lastChild);
        }

        return portal;
      });
      ref = createRef();
      render() {
        const { children, ...rest } = this.props.hostProps;

        return (
          <Fragment>
            {this.state.portal && createPortal(children, this.state.portal)}
            <WebComponent {...rest} ref={this.setRef} {...this.wcProps} />
          </Fragment>
        );
      }
    },
  );
}
