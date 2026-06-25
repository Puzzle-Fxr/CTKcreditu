import React from 'react';
// Fix: Globally declare React so child components don't crash when executed via Node
// @ts-ignore
globalThis.React = React;

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { Routes, Route } from 'react-router-dom';

import ScrollToTop from './src/pages/ScrollToTop';
import Home from './src/pages/Home';
import TermsOfService from './src/pages/TermsOfService';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(__dirname, 'dist');
const indexPath = path.join(distPath, 'index.html');

const baseHtml = fs.readFileSync(indexPath, 'utf8');

const routes = [
  { url: '/', file: 'index.html' },
  { url: '/terms-of-service', file: 'terms-of-service.html' }
];

routes.forEach((route) => {
  const appHtml = ReactDOMServer.renderToString(
    React.createElement(StaticRouter, { location: route.url },
      React.createElement(React.Fragment, null,
        React.createElement(ScrollToTop),
        React.createElement(Routes, null,
          React.createElement(Route, { path: '/', element: React.createElement(Home) }),
          React.createElement(Route, { path: '/terms-of-service', element: React.createElement(TermsOfService) })
        )
      )
    )
  );

  const outputHtml = baseHtml.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
  fs.writeFileSync(path.join(distPath, route.file), outputHtml);
});

console.log('🚀 Static pages successfully pre-rendered for SEO optimization!');

