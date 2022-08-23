import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { APP_INTERCEPTOR, NestApplication } from "@nestjs/core";
import { RequestTimeInterceptor } from "../request-time.interceptor";

import { CatsController } from "./cats.controller";
import { CatsMiddleware } from "./cats.middleware";
import { CatsService } from "./cats.service";

@Module({
  controllers: [CatsController],
  providers: [
    CatsService,
    { provide: APP_INTERCEPTOR, useClass: RequestTimeInterceptor },
  ],
})
export class CatsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CatsMiddleware).forRoutes("*");
  }
}
