import { Component, Method, State } from '@stencil/core';

@Component({
  tag: 'stateful-div',
})
export class StatefulDiv {
  @Method()
  setValue(value) {
    this.value = value;
  }
  @State() value: any;
  render() {
    return <div>{this.value}</div>;
  }
}
