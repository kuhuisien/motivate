import { useState, useCallback, useEffect } from "react";
import { ApiQuery } from "lib/types/common/data.types";

export const useAsync = <T, E = string>(
  asyncFunction: (requestParam?: any, queryObj?: any) => Promise<T>,
  immediate = true,
  firstlyQueryObj?: any
) => {
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error"
  >("idle");
  const [value, setValue] = useState<T | null>(null);
  const [error, setError] = useState<E | null>(null);
  // The execute function wraps asyncFunction and
  // handles setting state for pending, value, and error.
  // useCallback ensures the below useEffect is not called
  // on every render, but only if asyncFunction changes.
  const execute = useCallback(
    (requestParam?: any, queryObj?: ApiQuery) => {
      setStatus("pending");
      setValue(null);
      setError(null);
      return asyncFunction(requestParam, queryObj)
        .then((response: any) => {
          setValue(response);
          setStatus("success");
        })
        .catch((error: any) => {
          setError(error.message);
          setStatus("error");
        });
    },
    [asyncFunction]
  );
  // Call execute if we want to fire it right away.
  // Otherwise execute can be called later, such as
  // in an onClick handler.
  useEffect(() => {
    if (immediate) {
      execute(firstlyQueryObj);
    }
  }, [execute, immediate]);
  return { execute, status, value, error };
};
