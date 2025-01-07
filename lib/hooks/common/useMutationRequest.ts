import { useState, useCallback } from "react";
import { ApiQuery } from "lib/types/common/data.types";

export const useMutateRequest = <
  T,
  E = string,
  B = {},
  P = ApiQuery | undefined
>(
  asyncFunction: (requestBody: B, requestParam: P) => Promise<T>
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
    (requestBody: B, requestParam: P) => {
      setStatus("pending");
      setValue(null);
      setError(null);
      return asyncFunction(requestBody, requestParam)
        .then((response: T) => {
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

  return { execute, status, value, error };
};
