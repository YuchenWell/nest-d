import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { CatsService } from "./cats/cats.service";

@Injectable()
export class RequestTimeInterceptor implements NestInterceptor {
  constructor(private catsService: CatsService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {
    console.log("before: " + Date.now());
    console.log("cats inter: " + this.catsService.getCat());

    return next.handle().pipe(
      tap(() => {
        console.log("after: " + Date.now());
      })
    );
  }
}
