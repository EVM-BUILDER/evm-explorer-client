import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getHoldersByToken } from 'redux/token/actions'

function useTokenHolders(address) {
  const dispatch = useDispatch()
  const { holders } = useSelector((state) => state.Token)

  const [paramsTokenHolder, setParamsTokenHolder] = useState({
    page: 1,
    page_size: 50,
    tokenAddress: '',
  })

  const fetchTokenHolders = useCallback(() => {
    if (paramsTokenHolder.tokenAddress) {
      dispatch(getHoldersByToken(paramsTokenHolder))
    }
  }, [dispatch, paramsTokenHolder])

  useEffect(() => {
    fetchTokenHolders()
  }, [fetchTokenHolders])

  useEffect(() => {
    if (address) {
      setParamsTokenHolder((prev) => ({ ...prev, tokenAddress: address }))
    }
  }, [address])

  return {
    holders: holders[paramsTokenHolder.tokenAddress],
    paramsTokenHolder,
    setParamsTokenHolder,
    fetchTokenHolders,
  }
}

export default useTokenHolders
