import { combineReducers } from 'redux'
import Global from 'redux/global/reducer'
import Auth from 'redux/auth/reducer'
import User from 'redux/user/reducer'
import Settings from 'redux/settings/reducer'
import Token from 'redux/token/reducer'
import VerifyContract from 'redux/verifyContract/reducer'
import Address from 'redux/address/reducer'
import Accounts from 'redux/accounts/reducer'
import Transactions from 'redux/transactions/reducer'
import Blocks from 'redux/blocks/reducer'
import Statistics from 'redux/statistics/reducer'
import Language from 'redux/language/reducer'

export default combineReducers({
  Global,
  Auth,
  User,
  Settings,
  Token,
  VerifyContract,
  Address,
  Accounts,
  Transactions,
  Blocks,
  Statistics,
  Language,
})
