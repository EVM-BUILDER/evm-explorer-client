import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getListAbis } from '../actions'

function useFetchAllAbis(page, page_size) {
  const dispatch = useDispatch()
  const { abis, page: rPage, total, rPage_size } = useSelector((state) => state.Abis)

  const [paramsAllAbis, setParamsAllAbis] = useState({
    page: page || 1,
    page_size: page_size || 10,
  })

  const fetchAllAbis = useCallback(() => {
    dispatch(getListAbis(paramsAllAbis))
  }, [dispatch, paramsAllAbis])

  useEffect(() => {
    fetchAllAbis()
  }, [fetchAllAbis])

  return {
    abis: { data: abis, page: rPage, total, page_size: rPage_size },
    paramsAllAbis,
    setParamsAllAbis,
    fetchAllAbis,
  }
}

export default useFetchAllAbis
