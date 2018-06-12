# web-component-to-react

create universal and hydratable react wrapper for custom-elements/web-components

## install

`npm install web-component-to-react`

## Example

```jsx
import React from 'react';
import toReact from 'web-component-to-react';

const MyWebComponent = toReact('my-web-component');

export default function SomeComp({ children, eventHandler }) {
  return (
    <MyWebComponent onCustom={eventHandler}>
      <span className="custom">{children}</span>
    </MyWebComponent>
  );
}
```

## Motivation

[Custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)
are coming, and even though the standard does not support
server side rendering yet, approaches like [stencil](https://stenciljs.com/)
support ssr and pre-rendering of web-components.

So there will be a future where we implement a custom element once and then use
it in all our apps, no matter if the frontend is written in jQuery, Angular or
React.

But as of now there are still some bumps in the road.

> As a developer, you are free to use React in your Web Components, or to use Web Components in React, or both.
> [...] the best solution is to write a React component that behaves as a wrapper for your Web Component.
>
> _[react docs on web-components](https://reactjs.org/docs/web-components.html)_

Given we have a web-component `my-web-component`
Then the following code will cause multiple problems

```jsx
function Cmp({ children, eventHandler }) {
  return (
    <my-web-component onBaz={eventHandler}>
      <span className="custom">{children}</span>
    </my-web-component>
  );
}
```

### Problems

1.  React does not pass custom event handlers to non-react elements
2.  React also doesn't pass prop updates via `setAttribute` but web components
    rely on that in order to react to changes.
3.  If the `my-web-component` component creates additional markup that is pre-rendered
    by the server, react complains about a mismatch in hydration and throws
    away the server markup of `my-web-component`
4.  We can not just simply leave `my-web-component` alone with it's server markup since
    `children` is still a part or our react app that needs to be re-rendered
    on changes.
5.  Solving 1. - 4. requires a lot of custom code

## Api

### entries

This packages exposes a `main` and a `browser` field in it's `package.json`.
[webpack](https://webpack.js.org/) or [another modern bundler](https://duckduckgo.com/?q=webpack+alternatives) will use them automatically.

If you use custom tooling, be sure to use `web-component-to-react/server` and
`web-component-to-react/browser` in the respective environments.

### `toReact(WebComponent, options)`

`import toReact from 'web-component-to-react';`

```
WebComponent: string
options: {
  Portal: string?
  toEventHandlerName: func?
  toAttributeName: func?
}
```

This is a convenience wrapper that combines `asCustomElement` and `withPortal`.
See [example](#example) for usage or read on for api.

### `asCustomElement(WebComponent, options)`

`import { asCustomElement } from 'web-component-to-react';`

```
WebComponent: string
options: {
  toEventHandlerName: func?
  toAttributeName: func?
}
```

Solving [Problem 1 + 2](#problems) by passing props and event handlers
directly to the DOM element of the wrapped component instead of using react props.

#### options

##### `toEventHandlerName: func`

A function receiving `propName` and `propValue`.
Must return name of the event handler or falsy for non-event-handler props.

The default implementation converts `onCustom` to `custom` for all props that
start with `on` and have a value of type `function`

###### example

```jsx
import React from 'react';
import { asCustomElement } from 'web-component-to-react';

const MyWebComponent = asCustomElement('my-web-component', {
  toEventHandlerName(key, value) {
    if (key === 'foo') {
      return 'bar';
    }

    return null;
  },
});

export default function SomeComp({ eventHandler, other }) {
  return (
    <MyWebComponent foo={eventHandler} onClick={other}>
      Test
    </MyWebComponent>
  );
}
```

In the background this will set `myWebComponentRef.addEventListener('bar', eventHandler)`
while `onClick` will be passed as a react prop.

##### `toAttributeName: func`

A function receiving `propName` and `propValue`.
Must return name of the attribute or falsy for non-attribute props.

The default implementation converts `customValue` to `custom-value` for all props
that aren't an event handler according to `toEventHandlerName` expect for `children`.

###### example

```jsx
import React from 'react';
import { asCustomElement } from 'web-component-to-react';

const MyWebComponent = asCustomElement('my-web-component', {
  toAttributeName(key, value) {
    if (key === 'foo') {
      return 'super-foo';
    }

    return null;
  },
});

export default function SomeComp({ eventHandler }) {
  return <MyWebComponent foo="bar" baz="biz" />;
}
```

In the background this will set `myWebComponentRef.setAttribute('super-foo', 'bar')`
while `baz` will be passed as a react prop.

### `withPortal(WebComponent, options)`

`import { withPortal } from 'web-component-to-react';`

```
WebComponent: string
options: {
  Portal: string?
}
```

Solving [Problem 3 + 4](#problems) by moving react children of the wrapped
component into a hydratable portal.
The portal is then rendered into the slot of the web-component.

#### options

##### `Portal: string`

default: `'wcr-portal'`

Name of the portal element. The same element should be used across the whole app.

## License

> The MIT License
>
> Copyright (C) 2018 Hannes Diercks
>
> Permission is hereby granted, free of charge, to any person obtaining a copy of
> this software and associated documentation files (the "Software"), to deal in
> the Software without restriction, including without limitation the rights to
> use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
> of the Software, and to permit persons to whom the Software is furnished to do
> so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in all
> copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
> FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
> COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
> IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
> CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
