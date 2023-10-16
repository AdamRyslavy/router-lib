import { createRoutesPath } from "../router-lib/utils/createRoutePath";

export const appPaths = {
  home: createRoutesPath({
    path: "/",
    translatedPath: "/",
  }),
  articles: createRoutesPath<{ site: string; id: number }>({
    path: "/articles/:site/:id",
    translatedPath: "/clanky/:site/:id",
  }),
};

export const accountPaths = {
  account: createRoutesPath({
    path: "/account",
    translatedPath: "/ucet",
  }),
  accountInfo: createRoutesPath(
    {
      path: "/account/info",
      translatedPath: "/ucet/info",
    },
    "/account"
  ),
};
