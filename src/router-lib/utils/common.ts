import { RouteObject, createBrowserRouter, Location } from "react-router-dom";

export function routesInitializer(routes: RouteObject[]) {
  return {
    router: createBrowserRouter(routes),
  };
}

type WithRouterProxyConfig = {
  initialzer: typeof routesInitializer;
  beforeCallback?: (
    location: Location<unknown>,
    done: (value: unknown) => void
  ) => void;
};

export function withRouterProxy({
  initialzer,
  beforeCallback,
}: WithRouterProxyConfig) {
  return (routes: RouteObject[]) => {
    const { router: configuredRouter } = initialzer(routes);

    const blockNavigation = async (
      navigateFunction: typeof configuredRouter.navigate,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...args: any[]
    ) => {
      await new Promise((resolve) => {
        beforeCallback?.(configuredRouter.state.location, resolve);
      });

      navigateFunction(args[0], args[1]);
    };

    const navigateMiddleware = new Proxy(configuredRouter.navigate, {
      apply(target, _thisArgs, args) {
        if (beforeCallback) {
          return blockNavigation(target, args[0], args[2]);
        }
        return target(args[0], args[2]);
      },
    });

    configuredRouter.navigate = navigateMiddleware;

    return {
      router: configuredRouter,
    };
  };
}
