import { NavLink, Outlet } from "react-router";
import ROUTES from "../config/routes";

const NAV_ITEMS = [
  { to: ROUTES.HOME, label: "Overview" },
  { to: ROUTES.RANDOM, label: "Random" },
  { to: ROUTES.ALL, label: "All" },
  { to: ROUTES.CATEGORIES, label: "Categories" },
  { to: ROUTES.GROUPS, label: "Groups" },
  { to: ROUTES.SEARCH, label: "Search" },
  { to: ROUTES.SIMILAR, label: "Similar" },
];

const AppShell = () => {
  return (
    <main className="app-shell">
      <section className="container">
        <header className="site-header">
          <p className="site-header__eyebrow">Emoji Hub Explorer</p>
          <h1>API Playground</h1>
          <p>Browse every documented endpoint with ready-to-use examples.</p>

          <nav
            className="site-nav"
            aria-label="Emoji Hub endpoint routes"
          >
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  isActive
                    ? "site-nav__link site-nav__link--active"
                    : "site-nav__link"
                }
                end={item.to === ROUTES.HOME}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </header>

        <Outlet />
      </section>
    </main>
  );
};

export default AppShell;
