import React, { useCallback, useState } from 'react'
import AdminLayout from 'layouts/AdminLayout'
import Breadcrumb from 'components/Breadcrumb'
import WPageAdmin from '../WPageAdmin'
import { Table, Button, Space, Popconfirm } from 'antd'
import ModalUser from './components/ModalUser'
import useFetchAllUsers from 'redux/users/hooks/useFetchAllUsers'
import moment from 'moment-timezone'
import { updateUser, createUser } from 'redux/users/actions'
import { useDispatch } from 'react-redux'

const User = () => {
  const dispatch = useDispatch()

  const [showForm, setShowForm] = useState(false)
  const [currentUser, setCurrentUser] = useState()


  const { users, setParamsAllUsers, fetchAllUsers } = useFetchAllUsers(1, 10)

  const breadcrumb = [
    {
      link: '/admin',
      title: 'Dashboard',
    },
    {
      link: "/admin/users",
      title: "Users",
      isCurrent: true,
    }
  ]
  
  const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Subscribe',
      dataIndex: 'subscribe',
      key: 'subscribe',
      render: (subscribe) => (
        subscribe === true ? 'Yes' : 'No'
      )
    },
    {
      title: 'Last login',
      dataIndex: 'last_login',
      key: 'last_login',
      render: (time) => (
        time ? moment(time * 1000).format('DD-MM-YYYY HH:mm') : '--'
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" className='button-edit' onClick={() => {
            setCurrentUser(record)
            setShowForm(true)
          }}>Edit</Button>
          <Popconfirm
              title="Are you sure to delete this user?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => handleDeleteUser(record?._id?.['$oid'])}
          >
              <Button type="link" danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const handleDeleteUser = (user_id) => {
    console.log(user_id)
  }

  const handleEditUser = async (item) => {
    if(currentUser !== null) {
      await dispatch(updateUser(item));
    } else {
      await dispatch(createUser(item));
    }
    fetchAllUsers();

  }

  const handleCloseForm = useCallback(() => {
    setShowForm(false)
  }, [])

  return (
    <WPageAdmin>
      <Breadcrumb listItems={breadcrumb} />
      <div className='users-wrapper'>
        <div className='title-group'>
          <h2>Users</h2>
          <Button type="primary" className='button-create' onClick={() => {
            setCurrentUser(null)
            setShowForm(true)
          }}>Create</Button>
        </div>
        <ModalUser open={showForm} onClose={handleCloseForm} handleUpdateUser={handleEditUser} currentUser={currentUser} />
        <Table dataSource={users?.data || []} columns={columns} pagination={{
          total: users?.total || 0,
          page: users?.page || 1,
          page_size: users?.page_size || 10,
          showSizeChange: false, 
          onChange: (page, pageSize) => {
            setParamsAllUsers((prev) => {
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

User.Layout = AdminLayout

export default User
