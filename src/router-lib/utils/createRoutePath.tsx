import { RouteObject } from "react-router-dom";
import { compile, match } from "path-to-regexp";
import { isEqual } from "lodash";
import {
  RouteParams,
  RouteConstructor,
  RoutePath,
  RouteDefinition,
  RoutesConfigurator,
} from "../types/types";

const enrichRoute = <T extends RouteParams | undefined>(
  routeConstructor: RouteConstructor<T>,
  config: RoutePath,
  parentPath?: string
) => {
  const enrichedRouteConstructor = routeConstructor as RouteDefinition<T>;

  enrichedRouteConstructor.originalPath = config.path;
  enrichedRouteConstructor.originalTranslatedPath = config.translatedPath;
  enrichedRouteConstructor.parentPath = parentPath;

  return enrichedRouteConstructor;
};

export function createRoutesPath<T extends RouteParams | undefined = undefined>(
  config: RoutePath,
  parentPath?: string
) {
  const routeConstructor: RouteConstructor<T> = (params) => {
    const toPath = compile(config.translatedPath);
    const compiledPath = params ? toPath(params) : config.translatedPath;
    const urlMatch = match(config.path)(compiledPath);

    if (
      urlMatch &&
      params &&
      !isEqual(Object.keys(urlMatch.params).sort(), Object.keys(params).sort())
    ) {
      console.warn(
        `path: ${config.path} has invalid params. Got ${JSON.stringify(
          Object.keys(params)
        )} expected ${JSON.stringify(Object.keys(urlMatch.params))}`
      );
    }

    return compiledPath;
  };

  return enrichRoute(routeConstructor, config, parentPath);
}

const createPath = (path: string, parentPath?: string) => {
  return parentPath ? path.replace(`${parentPath}/`, "") : path;
};

export function createRoutesDefinition<
  T extends { [Property in keyof T]: T[Property] }
>(paths: T, routeConfig: (params: RoutesConfigurator<T>) => RouteObject[]) {
  const reducedPath = (
    Object.entries(paths) as [keyof T, RouteDefinition<undefined>][]
  ).reduce<RoutesConfigurator<T>>((result, [key, path]) => {
    return {
      ...result,
      [key]: createPath(path.originalTranslatedPath, path.parentPath),
    };
  }, {});

  return routeConfig(reducedPath);
}
