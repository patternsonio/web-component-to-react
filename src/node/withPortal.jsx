import React from 'react';
import PropTypes from 'prop-types';
import { DEFAULT_PORTAL_ELM } from '../common/constants';

export default function withPortal(
  WebComponent,
  { Portal = DEFAULT_PORTAL_ELM } = {},
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

  return Wrapper;
}
