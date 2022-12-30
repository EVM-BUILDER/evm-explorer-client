import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { requestUpdateProfile } from '../actions'

export const useUser = () => {
  const dispatch = useDispatch()
  const userInfo = useSelector((state) => state.User.userInfo)

  const updateProfile = useCallback(
    (params, cbs, cbe) => {
      dispatch(
        requestUpdateProfile(
          params,
          (result) => {
            cbs?.(result)
          },
          (error) => {
            cbe?.(error)
          },
        ),
      )
    },
    [dispatch],
  )
  return {
    userInfo,
    updateProfile,
  }
}
