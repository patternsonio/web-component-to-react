import { Component, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'set-to-button',
})
export class SetToButton {
  @Event() setTo: EventEmitter;
  @Prop() targetValue: any;
  emitSetTo = () => {
    this.setTo.emit(this.targetValue);
  };
  render() {
    return (
      <button onClick={this.emitSetTo}>
        <slot /> {this.targetValue}
      </button>
    );
  }
}
