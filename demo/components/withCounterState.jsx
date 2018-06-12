import React, { Component } from 'react';

export default function withCounterState(
  WrappedComponent,
  { count = 'count', increase = 'increase', decrease = 'decrease' } = {},
) {
  return class extends Component {
    state = {
      [count]: 0,
      [increase]: () => {
        this.setState((prevState) => ({
          [count]: prevState[count] + 1,
        }));
      },
      [decrease]: () => {
        this.setState((prevState) => ({
          [count]: prevState[count] - 1,
        }));
      },
    };
    render() {
      return <WrappedComponent {...this.props} {...this.state} />;
    }
  };
}
