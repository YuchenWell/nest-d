import { Injectable, NestMiddleware } from "@nestjs/common";
import { CatsService } from "./cats.service";

@Injectable()
export class CatsMiddleware implements NestMiddleware {
  constructor(private catsService: CatsService) {}

  use(req: any, res: any, next: (error?: any) => void) {
    console.log("middleware: ", this.catsService.getCat());

    next();
  }
}
