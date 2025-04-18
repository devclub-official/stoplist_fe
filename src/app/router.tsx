import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App";
import ErrorPage from "./ErrorPage";

const LoginPage = lazy(() => import("@/page/LoginPage"));
const SignUpPage = lazy(() => import("@/page/SignUpPage"));
const HomePage = lazy(() => import("@/page/HomePage"));
const BadgePage = lazy(() => import("@/page/BadgePage"));

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: () => <LoginPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/signup",
        Component: () => <SignUpPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/home",
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
