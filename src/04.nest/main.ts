import { HttpException, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./src/app.module";
import { RequestTimeInterceptor } from "./src/request-time.interceptor";
import { ResFormatterInterceptor } from "./src/response-format.intercepter";
import { WrapperErrorFilter } from "./src/wrapper-error.filter";

const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalFilters(new WrapperErrorFilter());
  app.useGlobalInterceptors(new ResFormatterInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  app.listen(3004);
  console.log("Listen 3004");
};

bootstrap();
