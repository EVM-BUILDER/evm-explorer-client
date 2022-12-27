import { getAuthToken } from 'utils/auth'
import * as actions from './actions'

const token = getAuthToken()
const initState = { token }

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token,
      }
    case actions.LOGOUT_REQUEST_SUCCESS:
      return {
        ...state,
        token: null,
      }
    default:
      return state
  }
}
