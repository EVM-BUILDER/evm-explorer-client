import React, { useCallback, useState } from 'react'
import AdminLayout from 'layouts/AdminLayout'
import Breadcrumb from 'components/Breadcrumb'
import WPageAdmin from '../WPageAdmin'
import { Table, Button } from 'antd'
import ModalABI from './components/ModalABI'
import { addAbi } from 'redux/abis/actions'
import { useDispatch } from 'react-redux'
import useFetchAllAbis from 'redux/abis/hooks/useFetchAllAbis'

const AbiLibrary = () => {
  const dispatch = useDispatch()

  const [showForm, setShowForm] = useState(false)


  const { abis, setParamsAllAbis, fetchAllAbis } = useFetchAllAbis(1, 10)

  const breadcrumb = [
    {
      link: '/admin',
      title: 'Dashboard',
    },
    {
      link: "/admin/abilibrary",
      title: "ABI Library",
      isCurrent: true,
    }
  ]
  
  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: 'id',
      render: (id) => (
        id?.['$oid'] || ""
      )
    },
  ]

  const handleAddAbi = async (data) => {
    console.log(data)
    await dispatch(addAbi(data));
    fetchAllAbis();
  }

  const handleCloseForm = useCallback(() => {
    setShowForm(false)
  }, [])

  return (
    <WPageAdmin>
      <Breadcrumb listItems={breadcrumb} />
      <div className='users-wrapper'>
        <div className='title-group'>
          <h2>ABIs</h2>
          <Button type="primary" className='button-create' onClick={() => {
            setShowForm(true)
          }}>Add ABI</Button>
        </div>
        <ModalABI open={showForm} onClose={handleCloseForm} handleAddAbi={handleAddAbi} />
        <Table dataSource={abis?.data || []} columns={columns} pagination={{
          total: abis?.total || 0,
          page: abis?.page || 1,
          page_size: abis?.page_size || 10,
          showSizeChange: false, 
          onChange: ({ page, page_size }) => {
            setParamsAllAbis((prev) => {
              return {
                ...prev,
                page,
                page_size,
              }
            })
          }
        }} />
      </div>
    </WPageAdmin>
  )
}

AbiLibrary.Layout = AdminLayout

export default AbiLibrary
