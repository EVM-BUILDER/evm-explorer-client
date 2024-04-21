export const SET_BLOCK = 'SET_BLOCK'
export const GET_BLOCKS_REQUEST = 'GET_BLOCKS_REQUEST'
export const GET_BLOCKS_START = 'GET_BLOCKS_START'
export const GET_BLOCKS_SUCCESS = 'GET_BLOCKS_SUCCESS'
export const GET_BLOCKS_FAILURE = 'GET_BLOCKS_FAILURE'

export const GET_BLOCK_DETAIL_START = 'GET_BLOCK_DETAIL_START'
export const GET_BLOCK_DETAIL_SUCCESS = 'GET_BLOCK_DETAIL_SUCCESS'
export const GET_BLOCK_DETAIL_FAILURE = 'GET_BLOCK_DETAIL_FAILURE'

export const getListBlocks = (params) => ({
    type: GET_BLOCKS_START,
    payload: { params },
})
export const getListBlocksSuccess = (data) => ({
    type: GET_BLOCKS_SUCCESS,
    payload: data,
})
export const getListBlocksFailure = (error) => ({
    type: GET_BLOCKS_FAILURE,
    payload: error,
})

export const getBlockDetail = (block, rpc) => ({
    type: GET_BLOCK_DETAIL_START,
    payload: { block, rpc },
})
export const getBlockDetailSuccess = (data) => ({
    type: GET_BLOCK_DETAIL_SUCCESS,
    payload: data,
})
export const getBlockDetailFailure = (error) => ({
    type: GET_BLOCK_DETAIL_FAILURE,
    payload: error,
})
