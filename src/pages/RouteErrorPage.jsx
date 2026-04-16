import { isRouteErrorResponse, Link, useRouteError } from "react-router";
import ROUTES from "../config/routes";

const RouteErrorPage = () => {
  const routeError = useRouteError();

  const status = isRouteErrorResponse(routeError) ? routeError.status : "Error";
  const message = isRouteErrorResponse(routeError)
    ? routeError.statusText || "Something went wrong."
    : routeError instanceof Error
      ? routeError.message
      : "Something went wrong.";

  return (
    <main className="app-shell">
      <section className="container">
        <div
          className="error-page"
          role="alert"
          aria-live="assertive"
        >
          <h1>{status}</h1>
          <p>{message}</p>
          <Link to={ROUTES.HOME}>Go back home</Link>
        </div>
      </section>
    </main>
  );
};

export default RouteErrorPage;
