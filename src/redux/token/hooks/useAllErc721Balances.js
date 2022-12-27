import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllErc721BalancesByToken } from '../actions'

function useAllErc721Balances(address, page, page_size) {
  const dispatch = useDispatch()
  const { balancesErc721 } = useSelector((state) => state.Token)

  const [paramsAllErc721Balances, setParamsAllErc721Balances] = useState({
    page: page || 1,
    page_size: page_size || 10,
    address: '',
  })

  const fetchAllErc721Balances = useCallback(() => {
    if (paramsAllErc721Balances.address) {
      dispatch(getAllErc721BalancesByToken(paramsAllErc721Balances))
    }
  }, [dispatch, paramsAllErc721Balances])

  useEffect(() => {
    fetchAllErc721Balances()
  }, [fetchAllErc721Balances])

  useEffect(() => {
    if (address) {
      setParamsAllErc721Balances((prev) => ({ ...prev, address }))
    }
  }, [address])

  return {
    balancesErc721: balancesErc721[address],
    paramsAllErc721Balances,
    setParamsAllErc721Balances,
    fetchAllErc721Balances,
  }
}

export default useAllErc721Balances
