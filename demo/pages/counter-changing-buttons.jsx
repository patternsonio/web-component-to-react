import React, { Fragment } from 'react';
import withCounterState from '../components/withCounterState';
import { CounterProps } from '../components/Counter';
import toReact from '../..';

const Button = toReact('s-button');

function ChangingButtons({ count, increase, decrease }) {
  return (
    <Fragment>
      <div data-test="counter-count">{count}</div>
      <Button onCustomClick={increase}>set to {count + 1}</Button>
      <Button onCustomClick={decrease}>set to {count - 1}</Button>
    </Fragment>
  );
}

ChangingButtons.propTypes = CounterProps;

export default withCounterState(ChangingButtons);
