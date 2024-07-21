import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTxsErc20 } from 'redux/token/actions'

export function useFetchTxsErc20(address, page, page_size, type) {
    const dispatch = useDispatch()
    const { txsErc20 } = useSelector((state) => state.Token)
    const [paramsTxsErc20, setParamsTxsErc20] = useState({
        page: page || 1,
        page_size: page_size || 50,
    })
    const fetchTxsErc20 = useCallback(() => {
        if (paramsTxsErc20.a || paramsTxsErc20.ca) {
            dispatch(getTxsErc20(paramsTxsErc20))
        }
    }, [dispatch, paramsTxsErc20])

    useEffect(() => {
        fetchTxsErc20()
    }, [fetchTxsErc20])

    useEffect(() => {
        if (address) {
            if (type === 'contract') {
                setParamsTxsErc20((prev) => ({ page: page || 1, page_size: page_size || 50, a: address }))
            } else {
                setParamsTxsErc20((prev) => ({ page: page || 1, page_size: page_size || 50, a: address }))
            }
        }
    }, [address, page, page_size, type])

    return {
        txsErc20: txsErc20[paramsTxsErc20.a],
        paramsTxsErc20,
        setParamsTxsErc20,
        fetchTxsErc20,
    }
}

export const useFetchTxsErc20WithCA = (address, contractAddress, page, page_size) => {
    const dispatch = useDispatch()
    const { txsErc20 } = useSelector((state) => state.Token)

    const [paramsTxsErc20, setParamsTxsErc20] = useState({
        page: page || 1,
        page_size: page_size || 50,
        a: address,
        ca: contractAddress,
    })

    const fetchTxsErc20 = useCallback(() => {
        if (paramsTxsErc20.ca || paramsTxsErc20.a) {
            dispatch(getTxsErc20(paramsTxsErc20))
        }
    }, [dispatch, paramsTxsErc20])

    useEffect(() => {
        fetchTxsErc20()
    }, [fetchTxsErc20])

    useEffect(() => {
        if (address && contractAddress) {
            setParamsTxsErc20((prev) => ({ ...prev, ca: contractAddress, a: address }))
        }
    }, [address, contractAddress])

    return {
        txsErc20: txsErc20[paramsTxsErc20.ca],
        paramsTxsErc20,
        setParamsTxsErc20,
        fetchTxsErc20,
    }
}
