import React from 'react'
import AdminLayout from 'layouts/AdminLayout'
import Breadcrumb from 'components/Breadcrumb'
import WPageAdmin from '../WPageAdmin'

const VerifyAddress = () => {
  const breadcrumb = [
    {
      link: '/admin',
      title: 'Dashboard',
    },
  ]

  return (
    <WPageAdmin>
      <Breadcrumb listItems={breadcrumb} />
      <h2>VerifyAddress</h2>
    </WPageAdmin>
  )
}

VerifyAddress.Layout = AdminLayout

export default VerifyAddress
