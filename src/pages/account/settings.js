import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

import PrivateLayout from 'layouts/PrivateLayout'
import AccountSettingsView from 'views/Account/Settings'

export default function Overview() {
    const dispatch = useDispatch()

    const router = useRouter()


    return <AccountSettingsView />
}

Overview.Layout = PrivateLayout
