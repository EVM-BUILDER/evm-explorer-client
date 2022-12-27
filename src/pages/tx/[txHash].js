import PublicLayoutBlock from 'layouts/PublicLayoutBlock';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router'

import { getListBlocks, getBlockDetail } from 'redux/blocks/actions'
import { getTransactionDetail } from 'redux/transactions/actions'

import TxView from 'views/Tx'
import { useEffect } from 'react';

export default function Tx() {
    const router = useRouter()
    const dispatch = useDispatch()

    const { transactionDetail } = useSelector((state) => state.Transactions)

    useEffect(() => {
        dispatch(getListBlocks({ page: 1, page_size: 1 }))
        dispatch(getTransactionDetail(router?.query?.txHash))
    }, [router?.query?.txHash])

    useEffect(() => {
        if (transactionDetail?.bn) {
            dispatch(getBlockDetail(transactionDetail?.bn))
        }
    }, [transactionDetail]);


    return <TxView />
}

Tx.Layout = PublicLayoutBlock
