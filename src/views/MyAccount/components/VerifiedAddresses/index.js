import React from 'react'
import { Button, Table } from 'antd'
import { useRouter } from 'next/router'
import Pagination from 'components/Table/Pagination'
import CardOverview from '../CardOverview'
import { formatCode } from 'library/helpers/CommonHelper'
import { Link } from 'components/Link'
import { BsPencilFill } from 'react-icons/bs'
import { useListInfoAddress } from 'redux/verifyContract/hooks'

const VerifiedAddresses = () => {
    const { query } = useRouter()

    const { listAddressVerify, paramsListInfoAddress, setParamsListInfoAddress } = useListInfoAddress(query)

    const columns = [
        {
            title: 'Address',
            dataIndex: 'address',
            render: (text) => <Link href={`/address/${text}`}>{formatCode(text, 6, 6)}</Link>,
        },
        {
            title: 'Quick Links',
            dataIndex: 'address',
            render: (text, record) => {
                return (
                    <div className="quick-link">
                        <Link href={`/tokenupdate/${record.address}`}>
                            <BsPencilFill />
                        </Link>
                        {/* <Link href={`/tokenicoupdate/${record.address}`}>
                            <BsCurrencyDollar />
                        </Link>
                        <Link href={`/dapp/edit/${record.address}`}>
                            <BsPencilFill />
                        </Link>
                        <Link href={`/contactus?id=5&amp;a=${record.address}`}>
                            <BsTagFill />
                        </Link>
                        <Link href={`/contactus?id=5&amp;a=${record.address}`}>
                            <BsFillTagsFill />
                        </Link> */}
                    </div>
                )
            },
        },
        {
            title: 'Verified Date',
            dataIndex: 'time',
            render: (text) => `2021-10-15`,
        },
    ]

    return (
        <CardOverview
            className="verified_addresses"
            title={'Verified Addresses'}
            rightNode={
                <Button className="btn_verified">
                    <span>Upgrade Plan &ensp;</span>
                    <img src="/images/account/verified.png" alt="" />
                </Button>
            }
        >
            {/* <p className="sub-title">
                The Verify Address Ownership process involves verifying the ownership of an PULSE address used to create an
                PULSESCAN smart contract. This verification will be linked to an PULSESCAN account. Once a user has claimed
                ownership of an address, the user will be able to update token information and address name tags without needing
                to sign a new message each time. Find out more about verify address ownership.
            </p> */}
            <div className=" verified_addresses_content">
                <div className="verified_addresses_content_top">
                    <div className="verified_addresses_content_top_username ">
                        <span style={{ fontSize: '14px', fontWeight: 400 }}>
                            {' '}
                            {listAddressVerify.total || 0} address verified (out of 1000 max limit)
                        </span>
                        <div>
                            <img src="/images/account/search.png" alt="" />
                        </div>
                    </div>

                    {listAddressVerify.data?.length > 0 ? (
                        <Table
                            className="TableVerifyAddress"
                            columns={columns}
                            rowKey={(record) => record._id.$oid}
                            dataSource={listAddressVerify.data || []}
                            loading={listAddressVerify.loading}
                            scroll={{ x: true }}
                            pagination={false}
                        />
                    ) : (
                        <div className="verified_addresses_content_top_username">
                            <p className="center">
                                <img src="/images/account/matching.png" alt="" />
                                &nbsp;You have yet to verify any address.
                            </p>
                        </div>
                    )}
                </div>

                <div className="verified_addresses_content_bottom">
                    <Pagination
                        total={listAddressVerify.total || 0}
                        page={paramsListInfoAddress.page}
                        page_size={paramsListInfoAddress.page_size}
                        showSizeChange={false}
                        // showTotal={`${listAddressVerify.total || 0} items`}
                        onChange={({ page, page_size }) => {
                            setParamsListInfoAddress((prev) => {
                                return {
                                    ...prev,
                                    page,
                                    page_size,
                                }
                            })
                        }}
                    />
                </div>
            </div>
        </CardOverview>
    )
}

export default VerifiedAddresses
