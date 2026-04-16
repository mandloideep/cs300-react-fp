import { useEffect, useMemo, useState } from "react";
import EmojiResultCard from "../components/EmojiResultCard";
import { getAllEmojis } from "../services/emojiHubService";

const MAX_VISIBLE = 24;

const AllEmojisPage = () => {
  const [scope, setScope] = useState("none");
  const [scopeValue, setScopeValue] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (scope !== "none" && !scopeValue.trim()) {
      setData([]);
      setError(`Enter a ${scope} value to fetch results.`);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      setError("");

      try {
        const filters =
          scope === "none"
            ? {}
            : {
                [scope]: scopeValue,
              };

        const response = await getAllEmojis(filters, controller.signal);
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
  }, [scope, scopeValue]);

  const visibleData = useMemo(() => {
    return data.slice(0, MAX_VISIBLE);
  }, [data]);

  return (
    <section className="endpoint-page">
      <header className="endpoint-page__header">
        <h1>All Emojis</h1>
        <p>GET /all, optionally filtered by category or group.</p>
      </header>

      <div className="controls-grid">
        <label>
          Filter type
          <select
            value={scope}
            onChange={(event) => setScope(event.target.value)}
          >
            <option value="none">No filter</option>
            <option value="category">Category</option>
            <option value="group">Group</option>
          </select>
        </label>

        <label>
          Filter value
          <input
            type="text"
            placeholder="animal-bird, flags, etc."
            value={scopeValue}
            onChange={(event) => setScopeValue(event.target.value)}
            disabled={scope === "none"}
          />
        </label>
      </div>

      {isLoading ? <p className="status">Loading emoji collection...</p> : null}
      {error ? <p className="status status--error">{error}</p> : null}
      {!isLoading && !error ? (
        <p className="status">
          Showing {visibleData.length} of {data.length} results.
        </p>
      ) : null}

      <div className="emoji-grid">
        {visibleData.map((emoji) => (
          <EmojiResultCard
            key={`${emoji.name}-${emoji.unicode?.[0]}`}
            emoji={emoji}
          />
        ))}
      </div>
    </section>
  );
};

export default AllEmojisPage;
