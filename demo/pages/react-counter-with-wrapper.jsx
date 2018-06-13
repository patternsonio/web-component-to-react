import React from 'react';
import withCounterState from '../components/withCounterState';
import Counter from '../components/Counter';
import toReact from '../..';

const Wrapper = toReact('w-rapper');
const CounterWithState = withCounterState(Counter);

export default function CounterWithWrapper() {
  return (
    <Wrapper>
      <CounterWithState />
    </Wrapper>
  );
}
