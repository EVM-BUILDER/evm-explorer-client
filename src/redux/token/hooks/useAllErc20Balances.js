import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllErc20BalancesByToken } from '../actions'

function useAllErc20Balances(address, page, page_size) {
  const dispatch = useDispatch()
  const { balancesErc20 } = useSelector((state) => state.Token)

  const [paramsAllErc20Balances, setParamsAllErc20Balances] = useState({
    page: page || 1,
    page_size: page_size || 10,
    address: '',
  })

  const fetchAllErc20Balances = useCallback(() => {
    if (paramsAllErc20Balances.address) {
      dispatch(getAllErc20BalancesByToken(paramsAllErc20Balances))
    }
  }, [dispatch, paramsAllErc20Balances])

  useEffect(() => {
    fetchAllErc20Balances()
  }, [fetchAllErc20Balances])

  useEffect(() => {
    if (address) {
      setParamsAllErc20Balances((prev) => ({ ...prev, address }))
    }
  }, [address])

  return {
    balancesErc20: balancesErc20[address],
    paramsAllErc20Balances,
    setParamsAllErc20Balances,
    fetchAllErc20Balances,
  }
}

export default useAllErc20Balances
