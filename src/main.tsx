import React from "react";
import ReactDOM from "react-dom/client";
import { Outlet, RouterProvider } from "react-router-dom";
import { createRoutesDefinition } from "./router-lib/utils/createRoutePath.tsx";
import App from "./App.tsx";
import {
  routesInitializer,
  withRouterProxy,
} from "./router-lib/utils/common.ts";
import { accountPaths, appPaths } from "./paths/appPaths.ts";

const appRoutes = createRoutesDefinition(appPaths, (paths) => [
  {
    path: paths.home,
    element: <App />,
  },
  {
    path: paths.articles,
    element: <h1>idk</h1>,
  },
]);

const accountRoutes = createRoutesDefinition(accountPaths, (paths) => [
  {
    path: paths.account,
    element: (
      <>
        <h1>account</h1>
        <Outlet />
      </>
    ),
    children: [
      {
        path: paths.accountInfo,
        element: <h1>info</h1>,
      },
    ],
  },
]);

const { router } = withRouterProxy({ initialzer: routesInitializer })([
  ...appRoutes,
  ...accountRoutes,
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
