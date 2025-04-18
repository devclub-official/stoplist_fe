import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App";
import ErrorPage from "./ErrorPage";

const HomePage = lazy(() => import("@/page/HomePage"));
const BadgePage = lazy(() => import("@/page/BadgePage"));

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: () => <HomePage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/badges",
        Component: () => <BadgePage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};
export default AppRouter;
