const Koa = require("koa");
const Router = require("koa-router");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";

// 只需要判断是否属于开发状态还是属于线上状态
const app = next({ dev });

// 用它来处理 HTTP 请求的响应了
const handle = app.getRequestHandler();

// 要等页面内容全部加载完毕之后
// app.prepare().then(() => {
const server = new Koa();
const router = new Router();

router.get("/test/:id", (ctx) => {
  //   ctx.body = `<p>request /test ${ctx.params.id}</p>`;
  ctx.body = { success: true };
  ctx.set("Content-type", "application/json");
});

// 中间件其实就是我们传入的一个一个方法，在 koa 接收到了发自浏览器的请求之后，会按照我们通过 server.use 传入中间件的顺序一个个调用这些中间件，所以在处理过程中，我们就可以对请求的内容和返回的内容进行一些操作。
// 在使用 use 中间件的时候一般会处理异步请求，特别的是中间件，如果还存在后续的中间件，无法考量都是同步的还是异步的，这时候必须要用 async 和 await
// ctx 是记录了我们所有请求的请求内容，以及我们要返回的话也是在 ctx 里面设置一些属性来进行返回，最简单的一个中间件就是我们要处理一个 HTTP 请求，我们要返回一段 HTML 的代码、
// 注意每个中间件里面的 next() 是表示要调用下一个中间件的意思，如果不加的话会停止在这个中间件，不会向下执行了。
//   server.use(async (ctx, next) => {
//     await handle(ctx.req, ctx.res);
//     ctx.respond = false;
//   });

// 这里可以在 server 做一些相应的配置设置，包括请求路径，以及请求方式
// server.use(async (ctx, next) => {
//   const path = ctx.path;
//   const method = ctx.method;
//   ctx.body = `<h1>BELIEVER</h1>${path}${method}`;
//   await next();
// });
// server.use(async (ctx, next) => {
//   ctx.body = "<h1>Thunder</h1>";
// });

server.use(router.routes());

server.listen(3000, () => {
  console.log("koa server listening in 3000");
});
// });
