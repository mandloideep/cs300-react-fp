import { unicodeToEmoji } from "../lib/emoji";

const EmojiResultCard = ({ emoji }) => {
  const visual = unicodeToEmoji(emoji.unicode);

  return (
    <article className="emoji-card">
      <div
        className="emoji-card__glyph"
        aria-hidden="true"
      >
        {visual || "?"}
      </div>
      <div className="emoji-card__content">
        <h3>{emoji.name}</h3>
        <p>
          <strong>Category:</strong> {emoji.category}
        </p>
        <p>
          <strong>Group:</strong> {emoji.group}
        </p>
      </div>
      <pre className="emoji-card__raw">{JSON.stringify(emoji, null, 2)}</pre>
    </article>
  );
};

export default EmojiResultCard;
