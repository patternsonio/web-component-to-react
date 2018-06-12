export default (props, getEventHandlerName) => {
  return Object.keys(props)
    .filter((key) => {
      return !getEventHandlerName(key, props[key]);
    })
    .reduce((memo, key) => {
      // eslint-disable-next-line no-param-reassign
      memo[key] = props[key];

      return memo;
    }, {});
};
