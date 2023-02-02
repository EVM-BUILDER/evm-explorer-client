import React, { useEffect } from 'react'
import { Collapse, Space } from 'antd'

import AdminLayout from 'layouts/AdminLayout'
import StatisticsForm from './components/StatisticsForm'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminSettings } from 'redux/settings/actions'
import Breadcrumb from 'components/Breadcrumb'

const { Panel } = Collapse

const breadcrumb = [
  {
    link: "/admin",
    title: "Dashboard"
  },
  {
    link: "/admin/settings/general",
    title: "Settings",
  },
  {
    link: "/admin/settings/statistics",
    title: "Statistics Box",
    isCurrent: true,
  }
]

const StatisticsBox = () => {
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
          <Panel header="Statistics Box Settings" key="1">
            <StatisticsForm settings={adminSettings} data={adminSettings?.statistics || {}} />
          </Panel>
        </Collapse>
      </Space>
    </>
  )
}

StatisticsBox.Layout = AdminLayout

export default StatisticsBox
