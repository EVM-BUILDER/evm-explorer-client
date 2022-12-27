import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router'
import { getBlockDetail } from 'redux/blocks/actions'

import PublicLayoutBlock from 'layouts/PublicLayoutBlock';
import BlockView from 'views/Block'

export default function Block() {
    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getBlockDetail(router?.query?.block))
    }, [router?.query?.block])

    return <BlockView />
}

Block.Layout = PublicLayoutBlock
