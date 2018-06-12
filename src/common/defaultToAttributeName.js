import kebabCase from 'lodash.kebabcase';

export default function defaultToAttributeName(toEventHandlerName) {
  return (key, value) => {
    if (toEventHandlerName(key, value) || key === 'children') {
      return null;
    }

    return kebabCase(key);
  };
}
