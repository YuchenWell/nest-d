import Koa from "koa";
import Router from "koa-router";

const app = new Koa();
const router = new Router();

app.use((ctx, next) => {
  console.log(1.1);
  next();
  console.log(1.2);
});

app.use((ctx, next) => {
  console.log(2.1);
  next();
  console.log(2.2);
});

app.use((ctx, next) => {
  console.log(3.1);
  next();
  console.log(3.2);
});

router.get("/test", (ctx, next) => {
  ctx.res.end("aaaa");
});

router.post("/test2", (ctx, res) => {
  ctx.res.end("aaaa");
});

app.use(router.routes());

app.listen(3003);

console.log("Listen 3003");
