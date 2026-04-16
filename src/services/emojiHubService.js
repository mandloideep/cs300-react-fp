const EMOJI_HUB_BASE_URL = "https://emojihub.yurace.pro/api";

const normalizeFilterValue = (value) => {
  if (!value) {
    return "";
  }

  return value
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, "-");
};

const buildFilterPath = ({ category, group } = {}) => {
  const normalizedCategory = normalizeFilterValue(category);
  const normalizedGroup = normalizeFilterValue(group);

  if (normalizedCategory && normalizedGroup) {
    throw new Error("Use either category or group, not both.");
  }

  if (normalizedCategory) {
    return `/category/${normalizedCategory}`;
  }

  if (normalizedGroup) {
    return `/group/${normalizedGroup}`;
  }

  return "";
};

const requestJson = async (path, signal) => {
  const response = await fetch(`${EMOJI_HUB_BASE_URL}${path}`, { signal });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
};

export const getRandomEmoji = (filters = {}, signal) => {
  const filterPath = buildFilterPath(filters);
  return requestJson(`/random${filterPath}`, signal);
};

export const getAllEmojis = (filters = {}, signal) => {
  const filterPath = buildFilterPath(filters);
  return requestJson(`/all${filterPath}`, signal);
};

export const getCategories = (signal) => {
  return requestJson("/categories", signal);
};

export const getGroups = (signal) => {
  return requestJson("/groups", signal);
};

export const searchEmojis = (query, signal) => {
  const normalizedQuery = query.trim();

  if (!normalizedQuery) {
    return Promise.resolve([]);
  }

  const params = new URLSearchParams({ q: normalizedQuery });
  return requestJson(`/search?${params.toString()}`, signal);
};

export const getSimilarEmojis = (name, signal) => {
  const normalizedName = normalizeFilterValue(name);

  if (!normalizedName) {
    return Promise.resolve([]);
  }

  return requestJson(`/similar/${normalizedName}`, signal);
};

const emojiHubService = {
  getRandomEmoji,
  getAllEmojis,
  getCategories,
  getGroups,
  searchEmojis,
  getSimilarEmojis,
};

export default emojiHubService;
