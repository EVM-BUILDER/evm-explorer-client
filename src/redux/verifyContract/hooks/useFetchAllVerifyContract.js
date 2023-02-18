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

export default useFetchAllVerifyContract
