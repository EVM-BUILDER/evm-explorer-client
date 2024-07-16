import React, { useEffect } from 'react'
import { Collapse, Space } from 'antd'

import AdminLayout from 'layouts/AdminLayout'
import TokenPriceSettingForm from './components/TokenPrice'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminSettings } from 'redux/settings/actions'
import Breadcrumb from 'components/Breadcrumb'

const { Panel } = Collapse

const breadcrumb = [
    {
        link: '/admin',
        title: 'Dashboard',
    },
    {
        link: '/admin/settings/general',
        title: 'Settings',
        isCurrent: true,
    },
    {
        link: '/admin/settings/token-price',
        title: 'Token price Settings',
        isCurrent: true,
    },
]

const TokenPriceSetting = () => {
    const dispatch = useDispatch()

    const { adminSettings } = useSelector((state) => state.Settings)

    useEffect(() => {
        dispatch(getAdminSettings())
    }, [dispatch])

    return (
        <>
            <Breadcrumb listItems={breadcrumb} />
            <Space direction="vertical" className="admin-setting-wrapper">
                <Collapse defaultActiveKey={['1']}>
                    <Panel header="Token Price Settings" key="1">
                        <TokenPriceSettingForm settings={adminSettings} data={adminSettings?.system || {}} />
                    </Panel>
                </Collapse>
            </Space>
        </>
    )
}

TokenPriceSetting.Layout = AdminLayout

export default TokenPriceSetting
