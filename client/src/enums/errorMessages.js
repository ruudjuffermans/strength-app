const errorMessages = {
    // ✅ HTTP Status Code Errors
    400: "Bad Request: The request could not be understood by the server.",
    401: "Unauthorized: You need to log in to perform this action.",
    403: "Forbidden: You don't have permission to access this resource.",
    404: "Not Found: The requested resource does not exist.",
    409: "Conflict: The request conflicts with existing data.",
    500: "Internal Server Error: Something went wrong on our end.",
    503: "Service Unavailable: Please try again later.",
  
    // ✅ Database Errors (PostgreSQL, MySQL)
    "23505": "This item already exists. Please try a different value.", // Unique constraint violation
    "23503": "This item cannot be deleted because it is linked to other records.", // Foreign key violation
    "22P02": "Invalid input: The provided value format is incorrect.", // Invalid text representation
    "22001": "Input too long: Please enter a shorter value.", // String too long
    "23502": "A required field is missing.", // Not null violation
  
    "USER_NOT_FOUND": "No user found with the provided credentials.",
    "INVALID_PASSWORD": "Incorrect password. Please try again.",
    "ACCOUNT_LOCKED": "Your account is locked due to too many failed login attempts.",
  };
  
  export const getErrorMessage = (errorCode) => {
    return errorMessages[errorCode] || "An unexpected error occurred. Please try again.";
  };