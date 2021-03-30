// const Redis = require("ioredis");

// const redis = new Redis({
//   port: 6378,
//   password: 123456,
// });

// // 首先 nodejs 连接数据库是异步任务，所以需要使用 promise 语法 ，或者用 async 和 await 语法

// const p = new Promise((resolve, reject) => {
//   // 其次，在 redis 中看到的方法都可以使用 redis 的实例进行使用
//   const keys = redis.keys("*");
//   resolve(keys);
// });
// p.then((keys) => console.log(keys));
(async () => {
  const Redis = require("ioredis");

  const redis = new Redis({
    port: 6378,
    password: 123456,
  });

  // 首先 nodejs 连接数据库是异步任务，所以需要使用 promise 语法 ，或者用 async 和 await 语法
  // const keys = await redis.keys("*");
  await redis.setex("c", 10, 123);
  const keys = await redis.keys("*");
  console.log(keys);
})();
