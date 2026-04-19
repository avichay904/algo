// Maayan customization: proxy /api to the public algorithm-visualizer.org server.
// CRA auto-loads this file and uses it INSTEAD of the "proxy" string in package.json.
// We explicitly force HTTPS and spoof Origin/Referer so the upstream server accepts
// our requests as if they came from its own frontend. Set-Cookie is stripped on
// responses so we never leak upstream session cookies into the local dev server.

const TARGET = 'https://algorithm-visualizer.org';
const hpm = require('http-proxy-middleware');
// http-proxy-middleware v1+ exposes { createProxyMiddleware }; v0.x exports the
// function as the module default. Support both so this file works regardless of
// which version react-scripts happens to pull in.
const createProxyMiddleware = hpm.createProxyMiddleware || hpm;

const options = {
  target: TARGET,
  changeOrigin: true,
  secure: true,
  xfwd: false,
  logLevel: 'warn',
  onProxyReq(proxyReq) {
    proxyReq.setHeader('Origin', TARGET);
    proxyReq.setHeader('Referer', TARGET + '/');
  },
  onProxyRes(proxyRes) {
    delete proxyRes.headers['set-cookie'];
  },
};

module.exports = function (app) {
  // v1+: app.use(path, createProxyMiddleware(options))
  // v0.x: app.use(createProxyMiddleware(path, options))
  try {
    app.use('/api', createProxyMiddleware(options));
  } catch (e) {
    app.use(createProxyMiddleware('/api', options));
  }
};
