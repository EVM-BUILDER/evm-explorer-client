const withMiddleware = (fn) => async (req, res) => {
  // common handle
  return await fn(req, res)
}

export default withMiddleware
