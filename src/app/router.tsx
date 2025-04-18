import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App";
import ErrorPage from "./ErrorPage";

const LoginPage = lazy(() => import("@/page/LoginPage"));
const SignUpPage = lazy(() => import("@/page/SignUpPage"));
const HomePage = lazy(() => import("@/page/HomePage"));
const BadgePage = lazy(() => import("@/page/BadgePage"));
const MyPage = lazy(() => import("@/page/MyPage"));

const router = createBrowserRouter([
  {
    path: "/",
    Component: () => <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    Component: () => <SignUpPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    Component: App,
    children: [
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
      {
        path: "/mypage",
        Component: () => <MyPage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};
export default AppRouter;
