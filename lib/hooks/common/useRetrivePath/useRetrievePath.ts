import { Path } from "lib/nav/path.types";
import { PATHS } from "lib/nav/routes";
import { useMemo } from "react";

/**
 * Finds and retrieves the Path of a particular path string value from global application
 * routes. This path should be a valid sub-path from the base URL domain of this application.
 * If the provided path cannot be found, a null value is returned instead.
 *
 * If the exact macthed path cannot be found and it is found to be the substring of the input (with query parameters), it will also be returned.
 *
 * @param {string} path  Sub-path from the base URL
 * @returns {Path | null}  The Path object for this input, NULL otherwise.
 */
const useRetrievePath = (path: string): Path | null => {
  const memoPathObj = useMemo(() => {
    const pathObj: Record<string, Path> = {};
    for (const key in PATHS) {
      const path = PATHS[key];
      const pKey = path.path;
      pathObj[pKey] = path;
    }
    return pathObj;
  }, []);

  const toReturn = memoPathObj[path];
  if (!toReturn) {
    return null;
  }

  return toReturn;
};

export { useRetrievePath };
