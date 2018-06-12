import React, { Fragment, Component } from 'react';
import withCounterState from '../components/withCounterState';
import { CounterProps } from '../components/Counter';
import toReact from '../..';

const Button = toReact('s-button');

export default withCounterState(
  class extends Component {
    propTypes = CounterProps;
    state = {
      increment: true,
    };
    setIncrement = ({ target: { value } }) => {
      this.setState({
        increment: value === 'increase',
      });
    };
    render() {
      const { count, increase, decrease } = this.props;
      return (
        <Fragment>
          <div data-test="counter-count">{count}</div>
          <Button onCustomClick={this.state.increment ? increase : decrease}>
            {this.state.increment ? 'increment' : 'decrement'}
          </Button>
          <label htmlFor="increase">
            increase
            <input
              type="radio"
              id="increase"
              name="switch"
              value="increase"
              checked={this.state.increment}
              onChange={this.setIncrement}
            />
          </label>
          <label htmlFor="decrease">
            decrease
            <input
              type="radio"
              id="decrease"
              name="switch"
              value="decrease"
              checked={!this.state.increment}
              onChange={this.setIncrement}
            />
          </label>
        </Fragment>
      );
    }
  },
);
