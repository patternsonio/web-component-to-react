import React, { createRef, Component, Fragment } from 'react';
import toReact from '../..';

const StatefulDiv = toReact('stateful-div');

export default class extends Component {
  setValue = ({ target: { value } }) => {
    this.ref.current.setValue(value);
  };
  ref = createRef();
  render() {
    return (
      <Fragment>
        <StatefulDiv ref={this.ref} />
        <input type="text" onChange={this.setValue} />
      </Fragment>
    );
  }
}
