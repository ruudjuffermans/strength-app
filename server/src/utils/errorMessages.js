const errorMessages = {
  // ✅ HTTP Errors
  400: "Bad Request: The request could not be processed.",
  401: "Unauthorized: Please log in to continue.",
  403: "Forbidden: You don't have permission for this action.",
  404: "Not Found: The requested resource was not found.",
  409: "Conflict: The request conflicts with existing data.",
  500: "Internal Server Error: Something went wrong on our end.",

  // ✅ Database Errors (PostgreSQL, MySQL, etc.)
  "23505": "This item already exists. Please choose a different value.",
  "23503": "This item cannot be deleted because it's linked to other records.",
  "22P02": "Invalid input format.",
  "22001": "Input too long. Please enter a shorter value.",
  "23502": "A required field is missing.",

  // ✅ Custom Application Errors
  "USER_NOT_FOUND": "No user found with the provided credentials.",
  "INVALID_PASSWORD": "Incorrect password. Please try again.",
  "ACCOUNT_LOCKED": "Too many failed login attempts. Your account is locked.",
};

/**
 * ✅ Extracts error code and returns a user-friendly message.
 * @param {Object} error - The error object
 * @returns {Object} - { errorCode, errorMessage, isUnknown }
 */
const getErrorMessage = (error) => {
  // Extract error code
  const errorCode = error?.status || error?.code || (error.response?.status ?? 500);

  // Check if the error is known
  const isKnownError = Object.hasOwnProperty.call(errorMessages, errorCode);

  // Get the error message
  const errorMessage = isKnownError
    ? errorMessages[errorCode]
    : "An unexpected error occurred. Please try again.";

  return { errorCode, errorMessage, isUnknown: !isKnownError };
};

module.exports = {
  getErrorMessage,
};
