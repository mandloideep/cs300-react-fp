import { Link } from "react-router";
import ROUTES from "../config/routes";

const ENDPOINT_CARDS = [
  {
    title: "Random Emoji",
    route: ROUTES.RANDOM,
    endpoint: "GET /random",
    description:
      "Fetch one random emoji, optionally constrained by category or group.",
  },
  {
    title: "All Emojis",
    route: ROUTES.ALL,
    endpoint: "GET /all",
    description:
      "Load the emoji collection with optional category/group filtering.",
  },
  {
    title: "Categories",
    route: ROUTES.CATEGORIES,
    endpoint: "GET /categories",
    description: "List every category available in the Emoji Hub API.",
  },
  {
    title: "Groups",
    route: ROUTES.GROUPS,
    endpoint: "GET /groups",
    description: "List every emoji group in the Emoji Hub API.",
  },
  {
    title: "Search",
    route: ROUTES.SEARCH,
    endpoint: "GET /search?q={query}",
    description: "Find emojis by matching text in their names.",
  },
  {
    title: "Similar",
    route: ROUTES.SIMILAR,
    endpoint: "GET /similar/{name}",
    description: "Discover related emojis for a given emoji name.",
  },
];

const HomePage = () => {
  return (
    <section className="home-page">
      <div className="home-page__intro">
        <h2>Explore Every Endpoint</h2>
        <p>
          Each page is wired to a dedicated service call so you can test and
          demonstrate the full Emoji Hub API quickly.
        </p>
      </div>

      <div className="home-card-grid">
        {ENDPOINT_CARDS.map((card) => (
          <article
            key={card.title}
            className="home-card"
          >
            <p className="home-card__endpoint">{card.endpoint}</p>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <Link to={card.route}>Open endpoint page</Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default HomePage;
