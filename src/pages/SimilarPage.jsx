import { useEffect, useState } from "react";
import EmojiResultCard from "../components/EmojiResultCard";
import { getSimilarEmojis } from "../services/emojiHubService";

const SimilarPage = () => {
  const [name, setName] = useState("cat");
  const [submittedName, setSubmittedName] = useState("cat");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await getSimilarEmojis(
          submittedName,
          controller.signal,
        );
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
  }, [submittedName]);

  const onSubmit = (event) => {
    event.preventDefault();
    setSubmittedName(name);
  };

  return (
    <section className="endpoint-page">
      <header className="endpoint-page__header">
        <h1>Similar Emojis</h1>
        <p>GET /similar/name returns emojis related to a given name.</p>
      </header>

      <form
        className="controls-grid"
        onSubmit={onSubmit}
      >
        <label>
          Emoji name
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="cat, grin, smile"
          />
        </label>

        <button
          type="submit"
          className="primary-btn"
        >
          Find Similar
        </button>
      </form>

      {isLoading ? <p className="status">Loading similar emojis...</p> : null}
      {error ? <p className="status status--error">{error}</p> : null}
      {!isLoading && !error ? (
        <p className="status">
          Found {data.length} similar result(s) for "{submittedName}".
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

export default SimilarPage;
