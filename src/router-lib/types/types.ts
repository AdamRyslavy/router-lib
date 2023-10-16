export type RoutePath = {
  path: string;
  translatedPath: string;
};

export type RouteParams = { [key: string]: unknown };

export type RouteConstructor<T> = (
  params: T extends undefined ? void : T
) => string;

export type RoutesConfigurator<
  T extends { [Property in keyof T]: T[Property] }
> = Partial<{ [Property in keyof T]: string }>;

export type RouteDefinition<T> = RouteConstructor<T> & RouteMetadata;

export type RouteMetadata = {
  originalPath: string;
  originalTranslatedPath: string;
  parentPath?: string;
};
