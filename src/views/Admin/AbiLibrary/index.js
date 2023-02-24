import React, { useCallback, useEffect, useState } from 'react'
import AdminLayout from 'layouts/AdminLayout'
import Breadcrumb from 'components/Breadcrumb'
import WPageAdmin from '../WPageAdmin'
import { Table, Button, Space, Popconfirm } from 'antd'
import ModalABI from './components/ModalABI'
import { addAbi, deleteAbi, updateStatus } from 'redux/abis/actions'
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
      title: 'Data',
      dataIndex: 'data',
      key: 'data',
      render: (data) => (
        data !== null && typeof data === 'object' ? JSON.stringify(data) : data
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="large" className='action'>
          <Popconfirm
              title="Are you sure to delete this Abi?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => handleDeleteAbi(record?._id['$oid'])}
          >
              <Button type="link" danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const handleAddAbi = (data) => {
    const dataSUbmit = [data?.data];
    dispatch(addAbi(dataSUbmit));
  }

  const handleDeleteAbi = (id) => {
    dispatch(deleteAbi({ ids: [id]}));
  }

  

  const handleCloseForm = useCallback(() => {
    setShowForm(false)
  }, [])

  useEffect(() => {
    if (abis.updateSucess) {
      fetchAllAbis();
      dispatch(updateStatus());
    }
  }, [abis.updateSucess])

  return (
    <WPageAdmin>
      <Breadcrumb listItems={breadcrumb} />
      <div className='abis-wrapper'>
        <div className='title-group'>
          <h2>ABIs</h2>
          <Button type="primary" className='button-create' onClick={() => {
            setShowForm(true)
          }}>Add ABI</Button>
        </div>
        <ModalABI open={showForm} onClose={handleCloseForm} handleAddAbi={handleAddAbi} />
        <Table dataSource={abis?.data || []} columns={columns} loading={abis?.loading || false} pagination={{
          total: abis?.total || 0,
          page: abis?.page || 1,
          page_size: abis?.page_size || 10,
          showSizeChange: false, 
          onChange: (page, pageSize) => {
            setParamsAllAbis((prev) => {
              return {
                ...prev,
                page,
                pageSize,
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
