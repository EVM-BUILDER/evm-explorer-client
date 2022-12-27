import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

import PublicLayoutBlock from 'layouts/PublicLayoutBlock'
import AccountOverviewView from 'views/Account/Overview'

export default function Overview() {
    const dispatch = useDispatch()

    const router = useRouter()


    return <AccountOverviewView />
}

Overview.Layout = PublicLayoutBlock
