import { createBrowserRouter } from "react-router";
import ROUTES from "./config/routes";
import AppShell from "./pages/AppShell";
import HomePage from "./pages/HomePage";
import RouteErrorPage from "./pages/RouteErrorPage";

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <AppShell />,
    errorElement: <RouteErrorPage />,
    children: [{ index: true, element: <HomePage /> }],
  },
]);

export default router;
