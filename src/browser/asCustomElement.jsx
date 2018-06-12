import React, { Component, createRef } from 'react';
import memorizeOne from 'memoize-one';
import defaultToEventHandlerName from '../common/defaultToEventHandlerName';
import defaultToAttributeName from '../common/defaultToAttributeName';
import filterMapProps from '../common/filterMapProps';

export default function asCustomElement(
  CustomElement,
  {
    toEventHandlerName = defaultToEventHandlerName,
    toAttributeName = defaultToAttributeName(toEventHandlerName),
  } = {},
) {
  return class extends Component {
    static displayName = `customElement(${CustomElement.displayName ||
      CustomElement.name ||
      CustomElement})`;
    componentDidMount() {
      this.updateHandlers({}, this.props, this.ref.current);
    }
    componentDidUpdate(prevProps) {
      this.updateHandlers(prevProps, this.props, this.ref.current);
    }
    componentWillUnmount() {
      this.updateHandlers(this.props, {}, this.ref.current);
    }
    restProps = memorizeOne((props) => {
      return filterMapProps(props, (key, value) => {
        return (
          !toEventHandlerName(key, value) && !toAttributeName(key, value) && key
        );
      });
    });
    updateHandlers = memorizeOne((prevProps, props, ref) => {
      if (!ref || prevProps === props) {
        return;
      }

      const prevHandlers = filterMapProps(prevProps, toEventHandlerName);
      const handlers = filterMapProps(props, toEventHandlerName);

      Object.keys(prevHandlers).forEach((key) => {
        if (!handlers[key] || prevHandlers[key] !== handlers[key]) {
          ref.removeEventListener(key, prevHandlers[key]);
        }
      });

      Object.keys(handlers).forEach((key) => {
        if (!prevHandlers[key] || prevHandlers[key] !== handlers[key]) {
          ref.addEventListener(key, handlers[key]);
        }
      });

      const prevAttrs = filterMapProps(prevProps, toAttributeName);
      const attrs = filterMapProps(props, toAttributeName);

      Object.keys(prevAttrs).forEach((key) => {
        if (attrs[key] == null) {
          ref.removeAttribute(key);
        }
      });

      Object.keys(attrs).forEach((key) => {
        if (prevAttrs[key] !== attrs[key]) {
          ref.setAttribute(key, attrs[key]);
        }
      });
    });
    ref = createRef();
    render() {
      return <CustomElement {...this.restProps(this.props)} ref={this.ref} />;
    }
  };
}
