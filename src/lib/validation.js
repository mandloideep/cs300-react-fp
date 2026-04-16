export const isNonEmptyString = (value) =>
  typeof value === "string" && value.trim().length > 0;

export const isValidHttpUrl = (value) => {
  if (!isNonEmptyString(value)) {
    return false;
  }

  try {
    const parsedUrl = new URL(value);
    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  } catch {
    return false;
  }
};

export const toErrorMessage = (error, fallback = "Something went wrong.") => {
  if (error instanceof Error && isNonEmptyString(error.message)) {
    return error.message;
  }

  return fallback;
};
