import { ArgumentsHost, ExceptionFilter } from "@nestjs/common";

export enum RequestStatus {
  "success",
  "fail",
}

export class WrapperErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();

    res.json({
      status: RequestStatus.fail,
      message: exception.response?.message ?? exception.message,
    });
  }
}
