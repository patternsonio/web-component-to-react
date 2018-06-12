import React from 'react';
import { asCustomElement } from '../..';

const Button = asCustomElement('s-button');

export default function Index() {
  return <Button onCustomClick={() => console.log('hello2')}>Hello</Button>;
}
