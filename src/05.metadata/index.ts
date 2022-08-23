import "reflect-metadata";
import express from "express";

const app = express();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

const CONTROLLER = "CONTROLLER";
const ROUTE = "ROUTE";

@Reflect.metadata(CONTROLLER, "/cats")
class CatsController {
  @Reflect.metadata(ROUTE, { method: "get", path: "/item" })
  getCat(req, res, next) {
    res.send("cat");
  }

  log() {
    console.log(111);
  }
}

const catsController = new CatsController();
const controllerPath = Reflect.getMetadata(CONTROLLER, CatsController);

Object.getOwnPropertyNames(Object.getPrototypeOf(catsController))
  .filter((prop) => {
    return Reflect.hasMetadata(ROUTE, catsController, prop);
  })
  .map((prop) => {
    const metadata = Reflect.getMetadata(ROUTE, catsController, prop);
    console.log(metadata);

    app[metadata.method](
      `${controllerPath}${metadata.path}`,
      (req, res, next) => {
        return catsController[prop](req, res, next);
      }
    );
  });

app.listen(3003);

console.log("Listen 3003");
