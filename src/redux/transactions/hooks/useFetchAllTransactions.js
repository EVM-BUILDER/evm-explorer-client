import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getListTransactions } from '../actions'

function useFetchAllTransactions(page, page_size) {
  const dispatch = useDispatch()
  const { transactions, page: rPage, total, rPage_size } = useSelector((state) => state.Transactions)

  const [paramsAllTxs, setParamsAllTxs] = useState({
    page: page || 1,
    page_size: page_size || 10,
    a: '',
    block_number: '',
  })

  const fetchAllTxs = useCallback(() => {
    dispatch(getListTransactions(paramsAllTxs))
  }, [dispatch, paramsAllTxs])

  useEffect(() => {
    fetchAllTxs()
  }, [fetchAllTxs])

  return {
    transactions: { data: transactions, page: rPage, total, page_size: rPage_size },
    paramsAllTxs,
    setParamsAllTxs,
    fetchAllTxs,
  }
}

export default useFetchAllTransactions
