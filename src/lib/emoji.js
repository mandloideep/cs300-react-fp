export const unicodeToEmoji = (unicodeValues = []) => {
  if (!Array.isArray(unicodeValues) || unicodeValues.length === 0) {
    return "";
  }

  const codePoints = unicodeValues
    .map((value) => Number.parseInt(value.replace("U+", ""), 16))
    .filter((value) => Number.isFinite(value));

  if (codePoints.length === 0) {
    return "";
  }

  return String.fromCodePoint(...codePoints);
};
