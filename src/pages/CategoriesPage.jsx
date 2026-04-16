import { useEffect, useState } from "react";
import { getCategories } from "../services/emojiHubService";

const CategoriesPage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await getCategories(controller.signal);
        setData(response);
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          setError(requestError.message);
          setData([]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <section className="endpoint-page">
      <header className="endpoint-page__header">
        <h1>Categories</h1>
        <p>GET /categories returns every available emoji category.</p>
      </header>

      {isLoading ? <p className="status">Loading categories...</p> : null}
      {error ? <p className="status status--error">{error}</p> : null}

      <div className="chip-grid">
        {data.map((category) => (
          <span
            key={category}
            className="chip"
          >
            {category}
          </span>
        ))}
      </div>

      <pre className="json-block">{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
};

export default CategoriesPage;
