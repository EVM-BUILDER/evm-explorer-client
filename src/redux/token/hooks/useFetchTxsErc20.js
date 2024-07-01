import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTxsErc20 } from 'redux/token/actions'

function useFetchTxsErc20(address, page, page_size) {
    const dispatch = useDispatch()
    const { txsErc20 } = useSelector((state) => state.Token)

    const [paramsTxsErc20, setParamsTxsErc20] = useState({
        page: page || 1,
        page_size: page_size || 50,
        ca: address,
    })

    const fetchTxsErc20 = useCallback(() => {
        if (paramsTxsErc20.ca) {
            dispatch(getTxsErc20(paramsTxsErc20))
        }
    }, [dispatch, paramsTxsErc20])

    useEffect(() => {
        fetchTxsErc20()
    }, [fetchTxsErc20])

    useEffect(() => {
        if (address) {
            setParamsTxsErc20((prev) => ({ ...prev, ca: address }))
        }
    }, [address])

    return {
        txsErc20: txsErc20[paramsTxsErc20.ca],
        paramsTxsErc20,
        setParamsTxsErc20,
        fetchTxsErc20,
    }
}

export default useFetchTxsErc20
