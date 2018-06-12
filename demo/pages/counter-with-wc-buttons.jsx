import React, { Fragment } from 'react';
import withCounterState from '../components/withCounterState';
import toReact from '../..';

const Button = toReact('s-button');

export default withCounterState(({ count, increase, decrease }) => {
  return (
    <Fragment>
      <div data-test="counter-count">{count}</div>
      <Button onCustomClick={increase}>increase</Button>
      <Button onCustomClick={decrease}>decrease</Button>
    </Fragment>
  );
});
