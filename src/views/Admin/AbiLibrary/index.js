import React from 'react'
import AdminLayout from 'layouts/AdminLayout'
import Breadcrumb from 'components/Breadcrumb'
import WPageAdmin from '../WPageAdmin'

const AbiLibrary = () => {
  const breadcrumb = [
    {
      link: '/admin',
      title: 'Dashboard',
    },
  ]

  return (
    <WPageAdmin>
      <Breadcrumb listItems={breadcrumb} />
      <h2>AbiLibrary</h2>
    </WPageAdmin>
  )
}

AbiLibrary.Layout = AdminLayout

export default AbiLibrary
