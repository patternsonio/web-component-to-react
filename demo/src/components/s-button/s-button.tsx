import { Component, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 's-button',
})
export class SButton {
  @Event() customClick: EventEmitter;
  render() {
    return (
      <button onClick={this.customClick.emit}>
        <slot />
      </button>
    );
  }
}
