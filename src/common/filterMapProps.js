export default function filterMapProps(props, filter) {
  return Object.keys(props).reduce((memo, key) => {
    const name = filter(key, props[key]);

    if (name) {
      // eslint-disable-next-line no-param-reassign
      memo[name] = props[key];
    }

    return memo;
  }, {});
}
