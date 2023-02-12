import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getListUsers } from '../actions'

function useFetchAllUsers(page, page_size) {
  const dispatch = useDispatch()
  const { users, page: rPage, total, rPage_size } = useSelector((state) => state.Users)

  const [paramsAllUsers, setParamsAllUsers] = useState({
    page: page || 1,
    page_size: page_size || 10,
  })

  const fetchAllUsers = useCallback(() => {
    dispatch(getListUsers(paramsAllUsers))
  }, [dispatch, paramsAllUsers])

  useEffect(() => {
    fetchAllUsers()
  }, [fetchAllUsers])

  return {
    users: { data: users, page: rPage, total, page_size: rPage_size },
    paramsAllUsers,
    setParamsAllUsers,
    fetchAllUsers,
  }
}

export default useFetchAllUsers
