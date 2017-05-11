import 'babel-polyfill';
import Koa from 'koa';
import views from 'koa-views';
import json from 'koa-json';
import onerror from 'koa-onerror';
import bodyParser from 'koa-bodyparser'
import KoaLogger from 'koa-logger';
const app = new Koa();

const index = require('./routes/index');
const users = require('./routes/users');

// error handler
onerror(app);

// middlewares
app.use(bodyParser());
app.use(json());
app.use(KoaLogger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
  extension: 'pug'
}));

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());

module.exports = app;
