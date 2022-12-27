import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getPulsePrice } from '../actions'

function useFetchPulsePrice() {
  const dispatch = useDispatch()

  const fetchPulsePrice = useCallback(() => {
    dispatch(getPulsePrice({ page: 1, page_size: 12 }))
  }, [dispatch])

  useEffect(() => {
    fetchPulsePrice()
  }, [fetchPulsePrice])

  return {
    fetchPulsePrice,
  }
}

export default useFetchPulsePrice
