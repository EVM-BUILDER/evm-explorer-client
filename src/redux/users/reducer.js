import * as actions from './actions'

const initState = {
  users: [],
  userDetail: {},
  page: 1,
  page_size: 25,
  total: 0,
  updateSucess: false,
  loading: false,
}

export default function UsersReducer(state = initState, action) {
  const { params, data } = action
  switch (action.type) {
    case actions.GET_USERS_START:
      return {
        ...state,
        users: [],
        loading: true,
      }
    case actions.GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload?.data,
        page: action.payload?.page || 1,
        page_size: action.payload?.page_size || 25,
        total: action.payload?.total || 25,
        loading: false,
      }
    case actions.GET_USERS_FAILURE:
      return {
        ...state,
        users: [],
        loading: false,
      }
    case actions.GET_USER_DETAIL_START:
      return {
        ...state,
        userDetail: {},
        loading: true,
      }
    case actions.GET_USER_DETAIL_SUCCESS:
      return {
        ...state,
        userDetail: action.payload?.data,
        loading: false,
      }
    case actions.GET_USER_DETAIL_FAILURE:
      return {
        ...state,
        userDetail: {},
        loading: false,
      }

      case actions.CREATE_USER_SUCCESS:
        return {
          ...state,
          updateSucess: true,
        }

      case actions.UPDATE_USER_SUCCESS:
        return {
          ...state,
          updateSucess: true,
        }
      
      case actions.DELETE_USER_SUCCESS:
        return {
          ...state,
          updateSucess: true,
        }

        case actions.UPDATE_STATUS:
          return {
            ...state,
            updateSucess: false,
          }

    default:
      return state
  }
}
