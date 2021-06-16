import { Path } from "./path.types";
import { PATHS } from "./routes";

/**
 * Finds and retrieves the display name of a particular path from global application
 * routes. This path should be a valid sub-path from the base URL domain of this application.
 * If the provided path cannot be found, a null value is returned instead.
 *
 * If a path is found to be the substring of the input (with query parameters), it will also be returned.
 *
 * @param {string} path  Sub-path from the base URL
 * @returns {Path | null}  The Path object for this input, NULL otherwise.
 */
const retrievePath = (path: string): Path | null => {
  if (!path) {
    return null;
  } else {
    let exactPath: Path | null = null;
    let substringPath: Path | null = null;

    for (let key in PATHS) {
      let keyPath = PATHS[key];
      if (keyPath.path === path) {
        exactPath = keyPath;
        break;
      } else if (path.includes(keyPath.path)) {
        substringPath = keyPath;
      }
    }

    return exactPath ?? substringPath;
  }
};

export { retrievePath };
