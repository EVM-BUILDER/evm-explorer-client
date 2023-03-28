import React from 'react'
import Breadcrumb from 'components/Breadcrumb'
import WPageAdmin from '../WPageAdmin'
import { Button, Popconfirm, Space, Table } from 'antd'
import useFetchAllVerifyContract from 'redux/verifyContract/hooks/useFetchAllVerifyContract'
import { useDispatch } from 'react-redux'
import { acceptVerifyAddress, rejectVerifyAddress } from 'redux/verifyContract/actions'
import { EyeIcon } from 'widgets/Svg'
import { Link } from 'components/Link'

const VerifyAddress = () => {
    const dispatch = useDispatch()

    const { contractsVerify, setParamsAllVerifyContract, fetchAllVerifyContract } = useFetchAllVerifyContract(1, 10)

    const breadcrumb = [
        {
            link: '/admin',
            title: 'Dashboard',
        },
        {
            link: '/admin/verifyaddress',
            title: 'Verify Address',
            isCurrent: true,
        },
    ]

    const columns = [
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            render: (text, record) => (
                <div className="d-flex-center">
                    <Link className="d-flex" href={`/admin/verifyaddress/${record.address}`}>
                        <EyeIcon className="pointer" style={{ marginRight: '6px' }} />
                    </Link>
                    <a class="content-hasktag" target="_blank" href={`/address/${text}`} rel="noreferrer">
                        {text}
                    </a>
                </div>
            ),
        },
        {
            title: 'Owner',
            dataIndex: 'owner',
            key: 'owner',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text) => <span class={text === 'approved' ? 'primary-color' : 'danger'}>{text}</span>,
        },
        // {
        //     title: 'Action',
        //     key: 'action',
        //     render: (_, record) => (
        //         <Space size="middle">
        //             <Popconfirm
        //                 title="Are you sure to accept verify address?"
        //                 okText="Yes"
        //                 cancelText="No"
        //                 onConfirm={() => handleAcceptVerifyAddress(record?.address)}
        //             >
        //                 <Button type="link">Accept</Button>
        //             </Popconfirm>
        //             <Popconfirm
        //                 title="Are you sure to reject verify address?"
        //                 okText="Yes"
        //                 cancelText="No"
        //                 onConfirm={() => handleRejectVerifyAddress(record?.address)}
        //             >
        //                 <Button type="link" danger>
        //                     Reject
        //                 </Button>
        //             </Popconfirm>
        //         </Space>
        //     ),
        // },
    ]

    const handleAcceptVerifyAddress = async (address) => {
        await dispatch(acceptVerifyAddress(address))
        fetchAllVerifyContract()
    }

    const handleRejectVerifyAddress = async (address) => {
        await dispatch(rejectVerifyAddress(address))
        fetchAllVerifyContract()
    }

    return (
        <WPageAdmin>
            <Breadcrumb listItems={breadcrumb} />
            <div className="verify-address-wrapper">
                <h2>Verify Address</h2>
                <Table
                    dataSource={contractsVerify?.data || []}
                    columns={columns}
                    pagination={{
                        total: contractsVerify?.total || 0,
                        page: contractsVerify?.page || 1,
                        page_size: contractsVerify?.page_size || 10,
                        showSizeChange: false,
                        onChange: (page, pageSize) => {
                            setParamsAllVerifyContract((prev) => {
                                return {
                                    ...prev,
                                    page,
                                    pageSize,
                                }
                            })
                        },
                    }}
                />
            </div>
        </WPageAdmin>
    )
}

export default VerifyAddress
