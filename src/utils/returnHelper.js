export const returnWithSuccess = (response) => {
  return {
    status: true,
    message: response?.message || 'Success',
    data: response || null,
  }
}

export const returnWithError = (error) => {
  return {
    status: false,
    message: error?.message || 'Error',
    data: error || null,
  }
}
