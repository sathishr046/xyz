export const handleAPIError = (error) => {
  if (error.response) {
    return `Error: ${error.response.data.error.message}`;
  }
  if (error.message) {
    return `Error: ${error.message}`;
  }
  return 'An unexpected error occurred';
};