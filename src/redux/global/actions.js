const actions = {
  CHANGE_CURRENT: 'CHANGE_CURRENT',

  changeCurrent: (current) => ({
    type: actions.CHANGE_CURRENT,
    current,
  }),
}
export default actions
