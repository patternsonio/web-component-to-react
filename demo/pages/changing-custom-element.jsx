import React, { Component, Fragment } from 'react';
import toReact from '../..';

const AnyElm = toReact('any-elm', {});

export default class AnyWrapper extends Component {
  state = {
    renderAs: 'div',
  };
  setRenderAs = ({ target: { value } }) => {
    this.setState(() => ({
      renderAs: value,
    }));
  };
  render() {
    return (
      <Fragment>
        <AnyElm renderAs={this.state.renderAs}>
          <span>Content</span>
        </AnyElm>
        <input
          value="div"
          onChange={this.setRenderAs}
          type="radio"
          checked={this.state.renderAs === 'div'}
        />
        <input
          value="h1"
          onChange={this.setRenderAs}
          type="radio"
          checked={this.state.renderAs === 'h1'}
        />
      </Fragment>
    );
  }
}
