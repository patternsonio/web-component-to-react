import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

export const CounterProps = {
  count: PropTypes.number.isRequired,
  increase: PropTypes.func.isRequired,
  decrease: PropTypes.func.isRequired,
  setTo: PropTypes.func.isRequired,
};

export default function Counter({ count, increase, decrease }) {
  return (
    <Fragment>
      <div data-test="counter-count">{count}</div>
      <button onClick={increase}>increase</button>
      <button onClick={decrease}>decrease</button>
    </Fragment>
  );
}

Counter.propTypes = CounterProps;
