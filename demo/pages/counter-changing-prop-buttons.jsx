import React, { Fragment } from 'react';
import withCounterState from '../components/withCounterState';
import { CounterProps } from '../components/Counter';
import toReact from '../..';

const Button = toReact('set-to-button');

function ChangingButtons({ count, setTo }) {
  return (
    <Fragment>
      <div data-test="counter-count">{count}</div>
      <Button onSetTo={setTo} targetValue={count + 1}>
        set to
      </Button>
      <Button onSetTo={setTo} targetValue={count - 1}>
        set to
      </Button>
    </Fragment>
  );
}

ChangingButtons.propTypes = CounterProps;

export default withCounterState(ChangingButtons);
