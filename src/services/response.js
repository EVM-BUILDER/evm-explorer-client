export function responseWidthSuccess(response) {
  return {
    status: true,
  }
}

export function responseWidthError(response) {
  return {
    status: false,
  }
}
