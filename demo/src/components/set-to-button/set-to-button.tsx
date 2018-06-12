import { Component, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'set-to-button',
})
export class SetToButton {
  @Event() setTo: EventEmitter;
  @Prop() target: any;
  emitSetTo = () => {
    this.setTo.emit(this.target);
  };
  render() {
    return (
      <button onClick={this.emitSetTo}>
        <slot /> {this.target}
      </button>
    );
  }
}
