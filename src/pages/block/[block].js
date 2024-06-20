import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { getBlockDetail } from 'redux/blocks/actions'
import { useSelector } from 'react-redux'

import PublicLayoutBlock from 'layouts/PublicLayoutBlock'
import BlockView from 'views/Block'

export default function Block() {
    const router = useRouter()
    const dispatch = useDispatch()
    const { settings } = useSelector((state) => state.Settings)
    useEffect(() => {
        dispatch(getBlockDetail(router?.query?.block, settings?.chain.rpc))
    }, [router?.query?.block, settings?.chain.rpc])

    return <BlockView />
}

Block.Layout = PublicLayoutBlock
