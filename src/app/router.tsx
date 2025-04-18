import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import ErrorPage from "./ErrorPage";
import ProtectedRoute from "@app/ProtectedRoute.tsx";

const LoginPage = lazy(() => import("@/page/LoginPage"));
const SignUpPage = lazy(() => import("@/page/SignUpPage"));
const HomePage = lazy(() => import("@/page/HomePage"));
const BadgePage = lazy(() => import("@/page/BadgePage"));
const MyPage = lazy(() => import("@/page/MyPage"));
const NotFoundPage = lazy(() => import('@/app/NotFoundPage'));

const router = createBrowserRouter([
  {
    path: '/',
    Component: () =>
        localStorage.getItem('userId') ? (
            (() => {
              window.location.href = '/home';
              return null;
            })()
        ) : (
            <LoginPage />
        ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    Component: SignUpPage,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    Component: ProtectedRoute,
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
      {
        path: '*',
        Component: NotFoundPage,
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};
export default AppRouter;
