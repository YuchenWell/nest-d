export const CONTROLLER = "CONTROLLER";
export const ROUTE = "ROUTE";
export const BODY = "BODY";

export const Controller = (path: string): ClassDecorator => {
  return (target: object) => {
    Reflect.defineMetadata(CONTROLLER, path, target);
  };
};

export const Route = (options: {
  method: string;
  path: string;
}): MethodDecorator => {
  return (target: object, prop: string) => {
    Reflect.defineMetadata(ROUTE, options, target, prop);
  };
};

export const Body = (): ParameterDecorator => {
  return (target: object, prop: string, idx: number) => {
    Reflect.defineMetadata(BODY, idx, target, prop);
  };
};
