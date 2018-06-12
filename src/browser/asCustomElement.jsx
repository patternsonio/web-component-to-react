import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import memorizeOne from 'memoize-one';
import defaultToEventHandlerName from '../common/defaultToEventHandlerName';
import defaultToAttributeName from '../common/defaultToAttributeName';
import filterMapProps from '../common/filterMapProps';
import namedForwardRef from './namedForwardRef';

export default function asCustomElement(
  CustomElement,
  {
    toEventHandlerName = defaultToEventHandlerName,
    toAttributeName = defaultToAttributeName(toEventHandlerName),
  } = {},
) {
  return namedForwardRef(
    class extends Component {
      static displayName = `customElement(${CustomElement.displayName ||
        CustomElement.name ||
        CustomElement})`;
      static propTypes = {
        hostProps: PropTypes.objectOf(PropTypes.any),
        forwardedRef: PropTypes.shape({
          current: PropTypes.any,
        }),
      };
      static defaultProps = {
        hostProps: {},
        forwardedRef: null,
      };
      componentDidMount() {
        this.updateHandlers({}, this.props.hostProps, this.getRef().current);
      }
      componentDidUpdate(prevProps) {
        this.updateHandlers(
          prevProps.hostProps,
          this.props.hostProps,
          this.getRef().current,
        );
      }
      componentWillUnmount() {
        this.updateHandlers(this.props.hostProps, {}, this.getRef().current);
      }
      getRef = () => {
        return this.props.forwardedRef || this.ref;
      };
      ref = createRef();
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
      restProps = memorizeOne((props) => {
        return filterMapProps(props, (key, value) => {
          return (
            !toEventHandlerName(key, value) &&
            !toAttributeName(key, value) &&
            key
          );
        });
      });
      render() {
        return (
          <CustomElement
            {...this.restProps(this.props.hostProps)}
            ref={this.getRef()}
          />
        );
      }
    },
  );
}
