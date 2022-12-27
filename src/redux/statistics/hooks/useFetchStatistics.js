import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getListStatistics } from 'redux/statistics/actions'

function useFetchStatistics() {
  const dispatch = useDispatch()
  const { statistics } = useSelector((state) => state.Statistics)

  const [paramsStatistic, setParamsStatistic] = useState({
    page: 1,
    page_size: 10,
  })

  const fetchStatistics = useCallback(() => {
    dispatch(getListStatistics(paramsStatistic))
  }, [dispatch, paramsStatistic])

  useEffect(() => {
    fetchStatistics()
  }, [fetchStatistics])

  return {
    statistics,
    paramsStatistic,
    setParamsStatistic,
    fetchStatistics,
  }
}

export default useFetchStatistics
