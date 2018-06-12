exports.config = {
  rootDir: `${__dirname}/demo`,
  suppressTypeScriptErrors: true,
  outputTargets: [
    { type: 'www', dir: 'static', resourcesUrl: '/static/build/app/' },
  ],
};
