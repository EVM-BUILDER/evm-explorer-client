import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getListContractsVerify } from '../actions'

function useFetchAllVerifyContract(page, page_size) {
    const dispatch = useDispatch()
    const { contractsVerified, page: rPage, total, rPage_size } = useSelector((state) => state.VerifyContract)

    const [paramsAllVerifyContract, setParamsAllVerifyContract] = useState({
        page: page || 1,
        page_size: page_size || 10,
    })

    const fetchAllVerifyContract = useCallback(() => {
        dispatch(getListContractsVerify(paramsAllVerifyContract))
    }, [dispatch, paramsAllVerifyContract])

    useEffect(() => {
        fetchAllVerifyContract()
    }, [fetchAllVerifyContract])

    return {
        contractsVerify: { data: contractsVerified?.data, page: rPage, total, page_size: rPage_size },
        paramsAllVerifyContract,
        setParamsAllVerifyContract,
        fetchAllVerifyContract,
    }
}

export function useFetchVerifyContractDetail(a) {
    const dispatch = useDispatch()
    const { contractsVerified } = useSelector((state) => state.VerifyContract)

    const fetchData = useCallback(() => {
        if (a) {
            dispatch(getListContractsVerify({ a }))
        }
    }, [dispatch, a])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return {
        contractsVerify: contractsVerified?.data ? contractsVerified?.data?.find((item) => item.address === a) : null,
        fetchVerifyContract: fetchData,
    }
}

export default useFetchAllVerifyContract
