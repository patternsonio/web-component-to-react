import React, { Fragment } from 'react';
import toReact from '../../src/toReact';

const Button = toReact('s-button');

export default function Index() {
  return (
    <Button onClick={() => console.log('hello2')}>
      <span>Hello</span>
    </Button>
  );
}
