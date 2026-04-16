import { createBrowserRouter } from "react-router";
import ROUTES from "./config/routes";
import AllEmojisPage from "./pages/AllEmojisPage";
import AppShell from "./pages/AppShell";
import CategoriesPage from "./pages/CategoriesPage";
import GroupsPage from "./pages/GroupsPage";
import HomePage from "./pages/HomePage";
import RandomEmojiPage from "./pages/RandomEmojiPage";
import RouteErrorPage from "./pages/RouteErrorPage";
import SearchPage from "./pages/SearchPage";
import SimilarPage from "./pages/SimilarPage";

const router = createBrowserRouter(
  [
    {
      path: ROUTES.HOME,
      element: <AppShell />,
      errorElement: <RouteErrorPage />,
      children: [
        { index: true, element: <HomePage /> },
        { path: ROUTES.RANDOM, element: <RandomEmojiPage /> },
        { path: ROUTES.ALL, element: <AllEmojisPage /> },
        { path: ROUTES.CATEGORIES, element: <CategoriesPage /> },
        { path: ROUTES.GROUPS, element: <GroupsPage /> },
        { path: ROUTES.SEARCH, element: <SearchPage /> },
        { path: ROUTES.SIMILAR, element: <SimilarPage /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL },
);

export default router;
