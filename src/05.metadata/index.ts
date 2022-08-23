import "reflect-metadata";
import * as express from "express";

import { BODY, Body, Controller, CONTROLLER, Route, ROUTE } from "./decorators";
import { isObservable, of } from "rxjs";
import { CatDto } from "./dto";
import { validate, validateOrReject } from "class-validator";
import { type } from "os";

const app = express();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

@Controller("/cats")
class CatsController {
  @Route({ method: "post", path: "/item" })
  getCat(@Body() body: CatDto) {
    return of(body);
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

    app[metadata.method](
      `${controllerPath}${metadata.path}`,
      async (req, res, next) => {
        const body = req.body;
        const bodyIndex = Reflect.getMetadata(BODY, catsController, prop);

        const args: any[] = [];
        args[bodyIndex] = body;

        const argTypes: any[] = Reflect.getMetadata(
          "design:paramtypes",
          catsController,
          prop
        );

        for (let idx = 0; idx < argTypes.length; idx++) {
          const Type = argTypes[idx];
          const instance = new Type();

          const arg = args[idx];
          for (const key in arg) {
            instance[key] = arg[key];
          }

          const errors = await validate(instance);

          if (errors.length > 0) {
            res.send(errors);
            return;
          }
        }

        let result = catsController[prop](...args);

        if (result instanceof Promise) {
          result = await result;
        }

        if (isObservable(result)) {
          result.subscribe((data) => {
            res.send(data);
          });
        } else {
          res.send(result);
        }
      }
    );
  });

app.listen(3005);

console.log("Listen 3005");
