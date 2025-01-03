import { useState, useCallback, useEffect } from "react";

export const useGetRequest = <T, E = string, P = undefined>(
  asyncFunction: (requestParam: P) => Promise<T>,
  immediate = true,
  firstlyRequestParam: P
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
    (requestParam: P) => {
      setStatus("pending");
      setValue(null);
      setError(null);
      return asyncFunction(requestParam)
        .then((response: T) => {
          setValue(response);
          setStatus("success");
        })
        .catch((error: any) => {
          console.log(error);
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
      execute(firstlyRequestParam);
    }
  }, [execute, immediate]);
  return { execute, status, value, error };
};
