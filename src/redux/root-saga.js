import { all } from 'redux-saga/effects'
import AuthSaga from 'redux/auth/saga'
import UserSaga from 'redux/user/saga'
import TokenSaga from 'redux/token/saga'
import VerifyContract from 'redux/verifyContract/saga'
import AddressSaga from 'redux/address/saga'
import TransactionsSaga from 'redux/transactions/saga'
import BlocksSaga from 'redux/blocks/saga'
import StatisticsSaga from 'redux/statistics/saga'
import AccountsSaga from 'redux/accounts/saga'
import SettingsSaga from 'redux/settings/saga'
import UsersSaga from 'redux/users/saga'
import AbisSaga from 'redux/abis/saga'

export default function* rootSaga() {
  yield all([
    AuthSaga(),
    UserSaga(),
    TokenSaga(),
    VerifyContract(),
    AddressSaga(),
    TransactionsSaga(),
    BlocksSaga(),
    StatisticsSaga(),
    AccountsSaga(),
    SettingsSaga(),
    UsersSaga(),
    AbisSaga(),
  ])
}
