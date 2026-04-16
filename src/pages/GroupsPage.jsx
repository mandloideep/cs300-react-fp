import { useEffect, useState } from "react";
import { getGroups } from "../services/emojiHubService";

const GroupsPage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await getGroups(controller.signal);
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
        <h1>Groups</h1>
        <p>GET /groups returns every available emoji group.</p>
      </header>

      {isLoading ? <p className="status">Loading groups...</p> : null}
      {error ? <p className="status status--error">{error}</p> : null}

      <div className="chip-grid">
        {data.map((group) => (
          <span
            key={group}
            className="chip"
          >
            {group}
          </span>
        ))}
      </div>

      <pre className="json-block">{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
};

export default GroupsPage;
