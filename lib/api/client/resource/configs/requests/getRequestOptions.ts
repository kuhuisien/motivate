/**
 * Formats the Standardized API Request options used for all API calls.
 *
 * @returns {Object} Axios compatible HTTP header object
 */
const getRequestOptions = (cookie?: string) => {
  if (cookie) {
    return {
      timeout: 30000,
      headers: {
        Cookie: cookie,
      },
    };
  } else {
    return {
      timeout: 30000,
    };
  }
};

export { getRequestOptions };
