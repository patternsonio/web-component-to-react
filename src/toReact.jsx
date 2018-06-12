import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import memorizeOne from 'memoize-one';

function getServerNodes(selector) {
  // eslint-disable-next-line no-undef
  const nodes = document.querySelectorAll(selector);
  const nodeData = [];

  nodes.forEach((node) => {
    nodeData.push([
      node.innerHTML,
      node.getAttributeNames().reduce((memo, name) => {
        // eslint-disable-next-line no-param-reassign
        memo[name] = node.getAttribute(name);
        return memo;
      }, {}),
    ]);
  });

  return nodeData;
}

function lcFirst(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

const PatternsonOutlet = 'p-ro';

export default function toReact(PatternsonComponent) {
  const serverNodes =
    typeof document !== 'undefined' ? getServerNodes(PatternsonComponent) : [];

  return class extends Component {
    static displayName = `patternson(${PatternsonComponent})`;
    static propTypes = {
      children: PropTypes.node,
    };
    static defaultProps = {
      children: null,
    };

    constructor(props) {
      super(props);

      this.setPortal = this.setPortal.bind(this);
      this.state = this.getInitialState(props);
    }

    getInitialState() {
      if (!process.browser) {
        return {};
      }

      const serverNode = serverNodes.shift();

      if (!serverNode) {
        return {};
      }

      return {
        hydrated: {
          ...serverNode[1],
          ...this.removeEventHandlers(this.props),
          dangerouslySetInnerHTML: {
            __html: serverNode[0],
          },
          ref: this.findPortal.bind(this),
          children: null,
          suppressHydrationWarning: true,
        },
      };
    }
    componentDidMount() {
      this.updateHandlers(this.getEventHandlers(this.props), this.state.elm);
    }
    componentDidUpdate() {
      this.updateHandlers(this.getEventHandlers(this.props), this.state.elm);
    }

    getEventHandlers = memorizeOne((props) => {
      const isHandler = /^on/;

      return Object.keys(props)
        .filter((key) => {
          return isHandler.test(key) && typeof props[key] === 'function';
        })
        .reduce((memo, key) => {
          memo.push({
            name: lcFirst(key.replace(isHandler, '')),
            handler: props[key],
          });

          return memo;
        }, []);
    });

    getAttributes() {
      return Object.keys(this.props)
        .filter((key) => {
          return ['string', 'number', 'boolean'].includes(
            typeof this.props[key],
          );
        })
        .reduce((memo, key) => {
          // eslint-disable-next-line no-param-reassign
          memo[key] = this.props[key];

          return memo;
        }, {});
    }
    setPortal(ref) {
      this.setState(() => ({
        portalRef: ref,
      }));
    }
    updateHandlers = memorizeOne((handlers, elm) => {
      if (!elm) {
        return;
      }

      handlers.forEach(({ name, handler }) => {
        elm.addEventListener(name, handler);
      });
    });
    removeEventHandlers = memorizeOne((props) => {
      const isHandler = /^on/;

      return Object.keys(props)
        .filter((key) => {
          return !isHandler.test(key) || typeof props[key] !== 'function';
        })
        .reduce((memo, key) => {
          // eslint-disable-next-line no-param-reassign
          memo[key] = props[key];

          return memo;
        }, {});
    });
    findPortal(ref) {
      const portal = ref.querySelector(PatternsonOutlet);

      while (portal.hasChildNodes()) {
        portal.removeChild(portal.lastChild);
      }

      this.setState(() => ({
        elm: ref,
        portalRef: portal,
      }));
    }

    render() {
      if (process.browser) {
        // console.log(this.state.hydrated);
        return (
          <Fragment>
            {this.state.portalRef &&
              createPortal(this.props.children, this.state.portalRef)}
            {!this.state.hydrated ? (
              <PatternsonComponent {...this.props} suppressHydrationWarning>
                <PatternsonOutlet
                  ref={this.setPortal}
                  suppressHydrationWarning
                />
              </PatternsonComponent>
            ) : (
              <PatternsonComponent {...this.state.hydrated} />
            )}
          </Fragment>
        );
      }

      return (
        <PatternsonComponent {...this.getAttributes()}>
          <PatternsonOutlet>{this.props.children}</PatternsonOutlet>
        </PatternsonComponent>
      );
    }
  };
}
