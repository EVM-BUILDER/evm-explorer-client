import { removeEmpty } from 'library/helpers/CommonHelper'
import { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getListAddressVerify } from 'redux/accounts/actions'

export function useListInfoAddress(query = {}) {
    const dispatch = useDispatch()
    const [paramsListInfoAddress, setParamsListInfoAddress] = useState({
        page: 1,
        page_size: 25,
        status_url: true, // for check is handle url done will fetch api
    })

    const fetchListVerifyAddress = useCallback(() => {
        if (!paramsListInfoAddress.status_url) {
            dispatch(getListAddressVerify(removeEmpty(paramsListInfoAddress)))
        }
    }, [dispatch, paramsListInfoAddress])

    useEffect(() => {
        setParamsListInfoAddress((prev) => ({
            ...prev,
            ...query,
            status_url: '',
        }))
    }, [query])

    useEffect(() => {
        fetchListVerifyAddress()
    }, [fetchListVerifyAddress])

    const { listAddressVerify } = useSelector((state) => state.Accounts)
    return { listAddressVerify, fetchListVerifyAddress, paramsListInfoAddress, setParamsListInfoAddress }
}
