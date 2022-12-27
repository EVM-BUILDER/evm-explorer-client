import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { loginRequest, logoutRequest, registerRequest, forgotRequest, requestVerifyEmail } from 'redux/auth/actions'
import { getProfile } from 'redux/user/actions'
import { getAuthToken } from 'utils/auth'

const useAuth = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const register = useCallback(
    (params, cbs, cbe) => {
      dispatch(registerRequest(params, cbs, cbe))
    },
    [dispatch],
  )

  const login = useCallback(
    (params, cbs, cbe) => {
      dispatch(
        loginRequest(
          params,
          () => {
            const tokenIsValid = getAuthToken()
            if (tokenIsValid) {
              dispatch(
                getProfile({}, () => {
                  router.push('/myaccount')
                }),
              )
            }
            cbs?.()
          },
          cbe,
        ),
      )
    },
    [dispatch, router],
  )

  const logout = useCallback(
    (params) => {
      dispatch(
        logoutRequest(params, () => {
          router.push('/login')
        }),
      )
    },
    [dispatch, router],
  )

  const forgot = useCallback(
    (params, cbs, cbe) => {
      dispatch(
        forgotRequest(
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

  const verifyEmail = useCallback(
    (params, cbs, cbe) => {
      dispatch(
        requestVerifyEmail(
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
    login,
    logout,
    register,
    forgot,
    verifyEmail,
  }
}

export default useAuth
