import * as actions from './actions'

const initState = {
    loading: false,
    blocks: [],
    blockDetail: {},
    page: 1,
    page_size: 25,
    total: 0,
}

export default function blocksReducer(state = initState, action) {
    switch (action.type) {
        case actions.GET_BLOCKS_START:
            return {
                ...state,
                // blocks: [],
                loading: true,
            }
        case actions.GET_BLOCKS_SUCCESS:
            return {
                ...state,
                blocks: action.payload?.data,
                page: action.payload?.page || 1,
                page_size: action.payload?.page_size || 25,
                total: action.payload?.total || 25,
                loading: false,
            }
        case actions.GET_BLOCKS_FAILURE:
            return {
                ...state,
                blocks: [],
                loading: false,
            }
        case actions.GET_BLOCK_DETAIL_START:
            return {
                ...state,
                blockDetail: {},
                loading: true,
            }
        case actions.GET_BLOCK_DETAIL_SUCCESS:
            console.log('action.payload', action.payload)
            return {
                ...state,
                blockDetail: action.payload?.data,
                loading: false,
            }
        case actions.GET_BLOCK_DETAIL_FAILURE:
            return {
                ...state,
                blockDetail: {},
                loading: false,
            }
        default:
            return state
    }
}
