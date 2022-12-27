import produce from 'immer'
import { CACHE_PROFILE } from 'config/constants'
import * as actions from './actions'
import * as auth from '../auth/actions'
import { isServer } from 'utils/isServer'
import { getProfileUser } from 'utils/auth'

const profile = getProfileUser()

const initialState = {
  userInfo: profile || null,
}

export default function HomeReducer(state = initialState, action) {
  const { payload } = action
  return produce(state, (draft) => {
    switch (action.type) {
      case actions.GET_PROFILE_SUCCESS:
        if (!isServer) {
          localStorage.setItem(CACHE_PROFILE, JSON.stringify(payload))
        }
        draft.userInfo = payload
        break
      case auth.LOGOUT_REQUEST_SUCCESS:
        draft.userInfo = null
        break
      default:
        return { ...state }
    }
  })
}
