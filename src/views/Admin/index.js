import React from 'react'
import AdminLayout from 'layouts/AdminLayout'
import Breadcrumb from 'components/Breadcrumb'
import WPageAdmin from './WPageAdmin'

const Dashboard = () => {
  const breadcrumb = [
    {
      link: '/admin',
      title: 'Dashboard',
    },
  ]

  return (
    <WPageAdmin>
      <Breadcrumb listItems={breadcrumb} />
      <h2>Dashboard</h2>
    </WPageAdmin>
  )
}

Dashboard.Layout = AdminLayout

export default Dashboard
