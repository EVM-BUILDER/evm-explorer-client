import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AdminLayout from 'layouts/AdminLayout'
import Breadcrumb from 'components/Breadcrumb'
import WPageAdmin from '../WPageAdmin'

import { getResource } from 'redux/settings/actions'

const Resource = () => {
  const dispatch = useDispatch()

  const { resource } = useSelector((state) => state.Settings)

  const breadcrumb = [
    {
      link: '/admin',
      title: 'Dashboard',
    },
    {
      link: "/admin/resource",
      title: "Resource",
      isCurrent: true,
    }
  ]

  useEffect(() => {
    dispatch(getResource())
  }, [dispatch])

  return (
    <WPageAdmin>
      <Breadcrumb listItems={breadcrumb} />
      <div className='resource-wrapper'>
        <h2>Resource</h2>
        <div className='group-resource'>
          <h3>CPU</h3>
          <p><label>Core number:</label><strong>{resource?.cpu?.core_num || 0}</strong></p>
          <p><label>Max:</label><strong>{resource?.cpu?.max || 0}</strong></p>
          <p><label>Used:</label><strong>{resource?.cpu?.used || 0}</strong></p>
        </div>
        <div className='group-resource'>
          <h3>Disk</h3>
          <p><label>Max:</label><strong>{resource?.disk?.max || 0}</strong></p>
          <p><label>Used:</label><strong>{resource?.disk?.used || 0}</strong></p>
        </div>
        <div className='group-resource'>
          <h3>Ram</h3>
          <p><label>Max:</label><strong>{resource?.ram?.max || 0}</strong></p>
          <p><label>Used:</label><strong>{resource?.ram?.used || 0}</strong></p>
        </div>
      </div>
    </WPageAdmin>
  )
}

Resource.Layout = AdminLayout

export default Resource
