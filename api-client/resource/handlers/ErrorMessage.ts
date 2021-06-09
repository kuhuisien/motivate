// ==========================
// Error message formatters
//
// Formats developer-facing error messages from all API calls.
// ==========================

// ==================
// COMMON
// ==================

export const formatPayloadUndefinedErrorMessage = (URL: string) => {
  return `Response payload from "${URL}" was found to be undefined`;
};

export const formatPayloadNullErrorMessage = (URL: string) => {
  return `Response payload from "${URL}" was found to be null`;
};
