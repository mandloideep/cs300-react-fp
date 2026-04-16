import { Outlet } from "react-router";

const AppShell = () => {
  return (
    <main className="app-shell">
      <section className="container">
        <Outlet />
      </section>
    </main>
  );
};

export default AppShell;
