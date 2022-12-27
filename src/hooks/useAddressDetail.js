import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAddressDetail } from 'redux/address/actions'

function useAddressDetail(address) {
  const dispatch = useDispatch()
  const { addressDetail } = useSelector((state) => state.Address)

  const fetchAddressDetail = useCallback(() => {
    if (address) {
      dispatch(getAddressDetail(address))
    }
  }, [dispatch, address])

  useEffect(() => {
    fetchAddressDetail()
  }, [fetchAddressDetail])

  return {
    addressDetail,
    fetchAddressDetail,
  }
}

export default useAddressDetail
