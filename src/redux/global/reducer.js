import actions from './actions'

const initState = {
  current: '',
}

export default function appReducer(state = initState, action) {
  switch (action.type) {
    case actions.CHANGE_CURRENT:
      return {
        ...state,
        current: action.current,
      }
    default:
      return state
  }
}
