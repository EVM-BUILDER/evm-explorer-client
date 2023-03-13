import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Progress } from 'antd'
import AdminLayout from 'layouts/AdminLayout'
import Breadcrumb from 'components/Breadcrumb'
import WPageAdmin from '../WPageAdmin'

import { getResource } from 'redux/settings/actions'

const Dashboard = () => {
  const dispatch = useDispatch()

  const { resource } = useSelector((state) => state.Settings)

  const breadcrumb = [
    {
      link: '/admin',
      title: 'Dashboard',
    }
  ]

  useEffect(() => {
    dispatch(getResource())
  }, [dispatch])

  return (
    <WPageAdmin>
      <Breadcrumb listItems={breadcrumb} />
      <div className='resource-wrapper'>
        <Card title="Resource" style={{ width: '100%' }}>
          <div className='group-resource'>
            <h3>CPU</h3>
            <div class="progressbar-item">
              <Progress type="circle" percent={Math.round(((resource?.cpu?.used || 0)/(resource?.cpu?.max || 1)) * 100 * 100)/100} />
            </div>
            <p><label>Core number:</label><strong>{resource?.cpu?.core_num || 0}</strong></p>
            <p><label>Max:</label><strong>{resource?.cpu?.max || 0}</strong></p>
            <p><label>Used:</label><strong>{resource?.cpu?.used || 0}</strong></p>
          </div>
          <div className='group-resource'>
            <h3>Disk</h3>
            <div class="progressbar-item">
              <Progress type="circle" percent={Math.round(((resource?.disk?.used || 0)/(resource?.disk?.max || 1)) * 100 * 100)/100} />
            </div>
            <p><label>Max:</label><strong>{resource?.disk?.max || 0}</strong></p>
            <p><label>Used:</label><strong>{resource?.disk?.used || 0}</strong></p>
          </div>
          <div className='group-resource'>
            <h3>Ram</h3>
            <div class="progressbar-item">
              <Progress type="circle" percent={Math.round(((resource?.ram?.used || 0)/(resource?.ram?.max || 1)) * 100 * 100)/100} />
            </div>
            <p><label>Max:</label><strong>{resource?.ram?.max || 0}</strong></p>
            <p><label>Used:</label><strong>{resource?.ram?.used || 0}</strong></p>
          </div>
        </Card>
      </div>
    </WPageAdmin>
  )
}

Dashboard.Layout = AdminLayout

export default Dashboard
