import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Optional,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseInterceptors,
} from "@nestjs/common";
import { timer, of, switchMap, Observable, map } from "rxjs";
import { RequestTimeInterceptor } from "../request-time.interceptor";
import { CatDto } from "./cats.dto";

import { CatsService } from "./cats.service";

@Controller("cats")
export class CatsController {
  @Inject(CatsService) catsService: CatsService;

  constructor() {}

  @Get(":id")
  getCat(@Param("id", ParseIntPipe) id: number) {
    return this.catsService.getCat();
  }

  @Post(":id")
  updateCat(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: CatDto
  ): Observable<string> {
    return timer(100).pipe(map(() => "1221"));
  }

  @Get("error")
  getError() {
    throw new BadRequestException("111");
  }
}
