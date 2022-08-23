import express from "express";

const app = express();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

app.use((req, res, next) => {
  console.log(1.1);
  next();
  console.log(1.2);
});

app.use((req, res, next) => {
  console.log(2.1);
  next();
  console.log(2.2);
});

app.use((req, res, next) => {
  console.log(3.1);
  next();
  console.log(3.2);
});

app.get("/test", (req, res) => {
  res.send("aaaa");
});

app.post("/test2", (req, res) => {
  console.log(req);
  res.send("aaaa");
});

app.listen(3003);

console.log("Listen 3003");
