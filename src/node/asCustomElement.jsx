import React from 'react';
import PropTypes from 'prop-types';
import defaultToEventHandlerName from '../common/defaultToEventHandlerName';
import defaultToAttributeName from '../common/defaultToAttributeName';
import filterMapProps from '../common/filterMapProps';

export default function asCustomElement(
  WrappedComponent,
  {
    toEventHandlerName = defaultToEventHandlerName,
    toAttributeName = defaultToAttributeName(toEventHandlerName),
  } = {},
) {
  const Wrapper = (props) => {
    return (
      <WrappedComponent
        {...toAttributeName(
          filterMapProps(props, (key, value) => {
            return !toEventHandlerName(key, value) && key;
          }),
        )}
      >
        {props.children}
      </WrappedComponent>
    );
  };

  Wrapper.propTypes = {
    children: PropTypes.node,
  };

  Wrapper.defaultProps = {
    children: null,
  };

  Wrapper.displayName = `customElement(${WrappedComponent.displayName ||
    WrappedComponent.name ||
    WrappedComponent})`;

  return Wrapper;
}
