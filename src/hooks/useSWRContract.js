export const FetchStatus = {
  Idle: 'IDLE',
  Fetching: 'FETCHING',
  Fetched: 'FETCHED',
  Failed: 'FAILED',
}

export const fetchStatusMiddleware = (useSWRNext) => {
  return (key, fetcher, config) => {
    const swr = useSWRNext(key, fetcher, config)
    return Object.defineProperty(swr, 'status', {
      get() {
        let status = FetchStatus.Idle

        if (!swr.isValidating && !swr.error && !swr.data) {
          status = FetchStatus.Idle
        } else if (swr.isValidating && !swr.error && !swr.data) {
          status = FetchStatus.Fetching
        } else if (swr.data) {
          status = FetchStatus.Fetched
        } else if (swr.error && !swr.data) {
          status = FetchStatus.Failed
        }
        return status
      },
    })
  }
}
