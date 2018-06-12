import React from 'react';
import PropTypes from 'prop-types';
import { DEFAULT_PORTAL_ELM } from '../common/constants';
import asCustomElement from './asCustomElement';

export default function toReact(
  WebComponent,
  { Portal = DEFAULT_PORTAL_ELM, toEventHandlerName, toAttributeName } = {},
) {
  const Wrapper = (props) => {
    return (
      <WebComponent {...props}>
        <Portal>{props.children}</Portal>
      </WebComponent>
    );
  };
  Wrapper.displayName = `uwctr(${WebComponent})`;
  Wrapper.propTypes = {
    children: PropTypes.node,
  };
  Wrapper.defaultProps = {
    children: null,
  };

  return asCustomElement(Wrapper, {
    toEventHandlerName,
    toAttributeName,
  });
}
