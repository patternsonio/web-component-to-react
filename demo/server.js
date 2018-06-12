const { createServer } = require('http');
const path = require('path');
const next = require('next');
const { Renderer, loadConfig } = require('@stencil/core/server');
const { config } = require('../stencil.config');

const port = parseInt(process.env.PORT, 10) || 3000;
const app = next({
  dev: true,
  dir: __dirname,
  conf: {
    webpack: (c) => {
      c.module.rules
        .filter(
          ({ test, loader }) =>
            test.test('.jsx') && loader !== 'hot-self-accept-loader',
        )
        .forEach((rule) => {
          rule.include.push(path.resolve(__dirname, '..', 'src'));
        });

      return c;
    },
  },
});
const handle = app.getRequestHandler();

const renderer = new Renderer(
  loadConfig(
    Object.assign({}, config, {
      flags: { prerender: true },
      rootDir: __dirname,
    }),
  ),
);

app.prepare().then(() => {
  createServer((req, res) => {
    const originalEnd = res.end;
    res.end = (doc) => {
      if (
        res.statusCode !== 200 ||
        res.getHeader('Content-Type').split(';')[0] !== 'text/html' ||
        (typeof doc !== 'string' && !(doc instanceof Buffer))
      ) {
        originalEnd.call(res, doc);
        return;
      }

      renderer.hydrate({ html: doc.toString() }).then(({ html }) => {
        res.setHeader('Content-Length', html.length);
        originalEnd.call(res, html);
      });
    };

    handle(req, res);
  }).listen(port, (err) => {
    if (err) throw err;
    // eslint-disable-next-line no-console
    console.log(`> Ready on http://localhost:${port}`);
  });
});
