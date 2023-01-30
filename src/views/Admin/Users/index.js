import React from 'react'
import AdminLayout from 'layouts/AdminLayout'
import Breadcrumb from 'components/Breadcrumb'
import WPageAdmin from '../WPageAdmin'

const User = () => {
  const breadcrumb = [
    {
      link: '/admin',
      title: 'Dashboard',
    },
  ]

  return (
    <WPageAdmin>
      <Breadcrumb listItems={breadcrumb} />
      <h2>User</h2>
    </WPageAdmin>
  )
}

User.Layout = AdminLayout

export default User
