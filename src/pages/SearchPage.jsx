import { useEffect, useState } from "react";
import EmojiResultCard from "../components/EmojiResultCard";
import { searchEmojis } from "../services/emojiHubService";

const SearchPage = () => {
  const [query, setQuery] = useState("smile");
  const [submittedQuery, setSubmittedQuery] = useState("smile");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await searchEmojis(submittedQuery, controller.signal);
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
  }, [submittedQuery]);

  const onSubmit = (event) => {
    event.preventDefault();
    setSubmittedQuery(query);
  };

  return (
    <section className="endpoint-page">
      <header className="endpoint-page__header">
        <h1>Search</h1>
        <p>GET /search?q=query lets you search emojis by name.</p>
      </header>

      <form
        className="controls-grid"
        onSubmit={onSubmit}
      >
        <label>
          Search query
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="smile, cat, heart"
          />
        </label>

        <button
          type="submit"
          className="primary-btn"
        >
          Search
        </button>
      </form>

      {isLoading ? <p className="status">Searching emojis...</p> : null}
      {error ? <p className="status status--error">{error}</p> : null}
      {!isLoading && !error ? (
        <p className="status">
          Found {data.length} result(s) for "{submittedQuery}".
        </p>
      ) : null}

      <div className="emoji-grid">
        {data.map((emoji) => (
          <EmojiResultCard
            key={`${emoji.name}-${emoji.unicode?.[0]}`}
            emoji={emoji}
          />
        ))}
      </div>
    </section>
  );
};

export default SearchPage;
