import { useEffect, useState } from "react";
import EmojiResultCard from "../components/EmojiResultCard";
import { getRandomEmoji } from "../services/emojiHubService";

const RandomEmojiPage = () => {
  const [scope, setScope] = useState("none");
  const [scopeValue, setScopeValue] = useState("");
  const [refreshToken, setRefreshToken] = useState(0);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (scope !== "none" && !scopeValue.trim()) {
      setData(null);
      setError(`Enter a ${scope} value to fetch a random emoji.`);
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

        const response = await getRandomEmoji(filters, controller.signal);
        setData(response);
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          setError(requestError.message);
          setData(null);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [scope, scopeValue, refreshToken]);

  return (
    <section className="endpoint-page">
      <header className="endpoint-page__header">
        <h1>Random Emoji</h1>
        <p>GET /random, with optional category or group filtering.</p>
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
            placeholder="face-positive, food-and-drink, etc."
            value={scopeValue}
            onChange={(event) => setScopeValue(event.target.value)}
            disabled={scope === "none"}
          />
        </label>

        <button
          type="button"
          className="primary-btn"
          onClick={() => setRefreshToken((value) => value + 1)}
        >
          Fetch Another
        </button>
      </div>

      {isLoading ? <p className="status">Loading random emoji...</p> : null}
      {error ? <p className="status status--error">{error}</p> : null}
      {data ? <EmojiResultCard emoji={data} /> : null}
    </section>
  );
};

export default RandomEmojiPage;
