import { StaticJsonRpcProvider } from '@ethersproject/providers'
import siteConfig from 'config/site.config'
import fetchHelper from 'library/helpers/FetchHelper'
import * as qs from 'query-string'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import * as actions from './actions'
import axios from 'axios'
import { getLatestTransaction, getListTransactions } from '../transactions/actions'
function getListBlocksFromApi({ params }) {
    const str = qs.stringify(params || {})
    return fetchHelper
        .fetch(`${siteConfig.apiUrl}/block?${str}`, {
            method: 'GET',
        })
        .then(([data, status]) => {
            return {
                data,
                status,
            }
        })
}

function* getListBlocksRequest({ payload }) {
    try {
        const { status, data } = yield call(getListBlocksFromApi, payload)
        if (status === 200) {
            yield put(actions.getListBlocksSuccess({ ...data }))
        }
    } catch (error) {
        yield put(actions.getListBlocksFailure(error))
    }
}

async function getBlockDetailFromApi(block, rpc) {
    try {
        // const res = await bscRpcProvider.getBlock(`0x${Number(block).toString(16)}`)
        const res = await axios.post(rpc, {
            jsonrpc: '2.0',
            method: 'eth_getBlockByNumber',
            params: [`0x${Number(block).toString(16)}`, false],
            id: 1,
        })
        console.log('res', res.data.result)
        return {
            data: res.data.result,
            status: 200,
        }
    } catch (error) {
        console.log('error', error)
        return {
            data: null,
            status: 400,
        }
    }
}

function* geBlockDetailRequest({ payload }) {
    try {
        const { status, data } = yield call(getBlockDetailFromApi, payload?.block, payload?.rpc)
        if (status === 200) {
            yield put(actions.getBlockDetailSuccess({ data }))
        }
    } catch (error) {
        yield put(actions.getBlockDetailFailure(error))
    }
}

function getLatestBlockFromApi(block) {
    return fetchHelper
        .fetch(`${siteConfig.apiUrl}/block/${block}`, {
            method: 'GET',
        })
        .then(([data, status]) => {
            return {
                data,
                status,
            }
        })
        .catch((error) => {
            return {
                data: null,
                status: 400,
            }
        })
}

function* getLatestBlockRequest({ payload }) {
    try {
        const { status, data } = yield call(getLatestBlockFromApi, payload?.block)
        if (status === 200) {
            if (data.data !== null) {
                yield put(actions.getLatestBlocksSuccess({ data }))
            } else {
                yield put(actions.getLatestBlocks(payload?.block))
            }
            if (data.data.tt > 0) {
                yield put(getListTransactions({ page: 1, page_size: 10 }))
            }
        }
    } catch (error) {
        yield put(actions.getBlockDetailFailure(error))
    }
}

export default function* blockSaga() {
    yield all([
        takeLatest(actions.GET_BLOCKS_START, getListBlocksRequest),
        takeLatest(actions.GET_BLOCK_DETAIL_START, geBlockDetailRequest),
        takeLatest(actions.GET_LATEST_BLOCKS_REQUEST, getLatestBlockRequest),
    ])
}
