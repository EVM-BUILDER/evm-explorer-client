import { useCallback, useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getListTransactions } from '../actions'
import { getLatestBlocks } from '../../blocks/actions'
function useFetchAllTransactions(page, page_size) {
    const dispatch = useDispatch()
    const { transactions, page: rPage, total, rPage_size } = useSelector((state) => state.Transactions)
    const { blocks } = useSelector((state) => state.Blocks)
    const { settings } = useSelector((state) => state.Settings)
    const rpc = settings?.chain.rpc
    const latestBlock = blocks?.[0]
    const [paramsAllTxs, setParamsAllTxs] = useState({
        page: page || 1,
        page_size: page_size || 10,
        a: '',
        block_number: '',
    })

    const fetchAllTxs = useCallback(() => {
        dispatch(getListTransactions(paramsAllTxs))
    }, [dispatch, paramsAllTxs])

    const getLatestBlock = useCallback(() => {
        if (latestBlock) {
            dispatch(getLatestBlocks((Number(latestBlock?.bn) + 1).toString()))
        }
    }, [dispatch, latestBlock, rpc])

    useEffect(() => {
        fetchAllTxs()
    }, [fetchAllTxs])

    useEffect(() => {
        //when latest block change, get latest block 3s per request
        getLatestBlock()
    }, [latestBlock])

    return {
        transactions: { data: transactions, page: rPage, total, page_size: rPage_size },
        paramsAllTxs,
        setParamsAllTxs,
        fetchAllTxs,
    }
}

export default useFetchAllTransactions
