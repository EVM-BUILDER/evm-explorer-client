import React from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { toArray } from 'lodash'
import { Button, Popconfirm, Space, Table } from 'antd'
import { ObjectUtils } from 'utils/object.utils'
import Breadcrumb from 'components/Breadcrumb'
import { useFetchVerifyContractDetail } from 'redux/verifyContract/hooks/useFetchAllVerifyContract'
import { acceptVerifyAddress, rejectVerifyAddress } from 'redux/verifyContract/actions'
import WPageAdmin from '../../WPageAdmin'

const breadcrumb = [
    {
        link: '/admin',
        title: 'Dashboard',
    },
    {
        link: '/admin/verifyaddress',
        title: 'Verify Address',
    },
    {
        link: '/admin/verifyaddress/:id',
        title: 'Verify Address Detail',
        isCurrent: true,
    },
]

const VerifyAddressDetail = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const { a } = router.query

    const { contractsVerify, fetchAllVerifyContract } = useFetchVerifyContractDetail(a)

    const parseToArray = ObjectUtils.toArray(contractsVerify)?.map((item) => {
        if (item.key === "_id") {
            return {
                key: "ID",
                value: item?.value?.[0]?.value,
            }
        }
        return {
            key: item.key.replaceAll(/[_-]/ig, " "),
            value: item.value,
        }
    });

    const columns = [
        {
            title: 'Key',
            dataIndex: 'key',
            className: 'data-key'
        },
        {
            title: 'Value',
            dataIndex: 'value',
            render: (text, record) => {
                if (typeof text === 'object') {
                    return <>{text.map((it) => `${it.key}: ${JSON.stringify(it.value)}`)}</>
                }
                if (record?.key === 'address') {
                    return <a class="content-hasktag" target="_blank" href={`/address/${text}`} rel="noreferrer">
                        {text}
                    </a>
                }
                return text
            },
        },
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
                <h2>Verify Address Detail</h2>
                <div className="d-flex-between-center" style={{ marginBottom: '12px' }}>
                    <h3>ID: <a class="content-hasktag" target="_blank" href={`/address/${a}`} rel="noreferrer">
                        {a}
                    </a></h3>
                    <Space size="middle">
                        <Popconfirm
                            title="Are you sure to accept verify address?"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => handleAcceptVerifyAddress(contractsVerify?.address)}
                        >
                            <Button>Accept</Button>
                        </Popconfirm>
                        <Popconfirm
                            title="Are you sure to reject verify address?"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => handleRejectVerifyAddress(contractsVerify?.address)}
                        >
                            <Button danger primary>
                                Reject
                            </Button>
                        </Popconfirm>
                    </Space>
                </div>
                <Table dataSource={parseToArray} columns={columns} loading={parseToArray.length === 0} pagination={false} />
            </div>
        </WPageAdmin>
    )
}

export default VerifyAddressDetail
