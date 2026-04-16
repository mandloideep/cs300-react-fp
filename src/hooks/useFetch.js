import { useEffect, useState } from "react";
import { isValidHttpUrl, toErrorMessage } from "../lib/validation";

export const useFetch = (url, options) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) {
      return undefined;
    }

    if (!isValidHttpUrl(url)) {
      setError("Invalid URL provided.");
      setData(null);
      setIsLoading(false);
      return undefined;
    }

    const controller = new AbortController();

    const runFetch = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const json = await response.json();
        setData(json);
      } catch (fetchError) {
        if (fetchError.name !== "AbortError") {
          setError(toErrorMessage(fetchError));
          setData(null);
        }
      } finally {
        setIsLoading(false);
      }
    };

    runFetch();

    return () => {
      controller.abort();
    };
  }, [url, options]);

  return { data, isLoading, error };
};

export default useFetch;
