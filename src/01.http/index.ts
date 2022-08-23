import { createServer } from "http";

const server = createServer((req, res) => {
  res.end(`eaa`);
});

server.listen(3002);

console.log("Listen 3002");
