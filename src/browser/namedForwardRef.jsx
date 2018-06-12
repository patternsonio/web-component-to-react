import React, { forwardRef } from 'react';

export default function namedForwardRef(WrappedComponent) {
  const Wrapper = forwardRef((props, ref) => {
    return <WrappedComponent hostProps={props} forwardedRef={ref} />;
  });

  Wrapper.displayName =
    WrappedComponent.displayName || WrappedComponent.name || WrappedComponent;

  return Wrapper;
}
