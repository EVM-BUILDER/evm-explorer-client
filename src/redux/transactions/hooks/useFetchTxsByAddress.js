import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTxsByAddress } from '../actions'

function useFetchTxsByAddress(address, page, page_size) {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.Transactions)

    const [paramsTxsByAddress, setParamsTxsByAddress] = useState({
        page: page || 1,
        page_size: page_size || 10,
        a: '',
    })

    const fetchTxsByAddress = useCallback(() => {
        if (paramsTxsByAddress.a) {
            dispatch(getTxsByAddress(paramsTxsByAddress))
        }
    }, [dispatch, paramsTxsByAddress])

    useEffect(() => {
        fetchTxsByAddress()
    }, [fetchTxsByAddress])

    useEffect(() => {
        if (address) {
            setParamsTxsByAddress((prev) => ({ ...prev, a: address }))
        }
    }, [address])

    return {
        txsByAddress: data?.txsByAddress[address],
        paramsTxsByAddress,
        setParamsTxsByAddress,
        fetchTxsByAddress,
    }
}

export default useFetchTxsByAddress
