/**
 * Formats the Standardized API Request options used for all API calls.
 *
 * @returns {Object} Axios compatible HTTP header object
 */
const getRequestOptions = () => {
  return {
    timeout: 30000,
  };
};

export { getRequestOptions };
