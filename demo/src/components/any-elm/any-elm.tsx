import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'any-elm',
})
export class SButton {
  @Prop({
    attr: 'renderas',
  })
  renderAs: string;
  render() {
    const Elm = this.renderAs;
    return (
      <Elm>
        <slot />
      </Elm>
    );
  }
}
