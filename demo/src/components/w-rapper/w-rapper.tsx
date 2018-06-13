import { Component } from '@stencil/core';

@Component({
  tag: 'w-rapper',
})
export class Wrapper {
  render() {
    return (
      <div>
        <slot />
      </div>
    );
  }
}
