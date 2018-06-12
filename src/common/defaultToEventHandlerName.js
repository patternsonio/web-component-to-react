import lcFirst from './lcFirst';

const isHandler = /^on/;

export default function defaultToEventHandlerName(key, value) {
  if (!isHandler.test(key) || typeof value !== 'function') {
    return null;
  }

  return lcFirst(key.replace(isHandler, ''));
}
