import React, { Fragment } from 'react';
import withCounterState from '../components/withCounterState';

export default withCounterState(({ count, increase, decrease }) => {
  return (
    <Fragment>
      <div data-test="counter-count">{count}</div>
      <button onClick={increase}>increase</button>
      <button onClick={decrease}>decrease</button>
    </Fragment>
  );
});
