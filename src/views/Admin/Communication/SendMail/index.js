import React from 'react'
import AdminLayout from 'layouts/AdminLayout'
import Breadcrumb from 'components/Breadcrumb'
import WPageAdmin from 'views/Admin/WPageAdmin'

const SendMail = () => {
  const breadcrumb = [
    {
      link: '/admin',
      title: 'Dashboard',
    },
  ]

  return (
    <WPageAdmin>
      <Breadcrumb listItems={breadcrumb} />
      <h2>SendMail</h2>
    </WPageAdmin>
  )
}

SendMail.Layout = AdminLayout

export default SendMail
