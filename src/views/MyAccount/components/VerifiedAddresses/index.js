import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'antd'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Pagination from 'components/Table/Pagination'
import CardOverview from '../CardOverview'
import { formatCode, removeEmpty } from 'library/helpers/CommonHelper'
import { getListAddressVerify } from 'redux/accounts/actions'
import { Link } from 'components/Link'
import { BsCurrencyDollar, BsFillTagsFill, BsPencilFill, BsTagFill } from 'react-icons/bs'

const VerifiedTitle = styled.div`
  margin-top: 24px;
  margin-left: 24px;
  margin-right: 24px;
  font-size: 16px;
`
const VerifiedAddresses = () => {
  const dispatch = useDispatch()
  const { query } = useRouter()

  const { listAddressVerify } = useSelector((state) => state.Accounts)

  // console.log('listAddressVerify', listAddressVerify)

  // handle params with url
  const [params, setParams] = useState({
    page: 1,
    page_size: 25,
    status_url: true, // for check is handle url done will fetch api
  })
  useEffect(() => {
    setParams((prev) => ({
      ...prev,
      ...query,
      status_url: '',
    }))
  }, [query])
  useEffect(() => {
    if (!params.status_url) {
      dispatch(getListAddressVerify(removeEmpty(params)))
    }
  }, [dispatch, params])

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
            <Link href={`/tokenicoupdate/${record.address}`}>
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
            </Link>
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
      // rightNode={
      //   <div className="verified_addresses_title">
      //     <Button className="btn_verified">
      //       Upgrade Plan &ensp;
      //       <img src="/images/account/verified.png" alt="" />
      //     </Button>
      //   </div>
      // }
    >
      <VerifiedTitle>
        <p>
          {/* The Verify Address Ownership process involves verifying the ownership of an PULSE address used to create an PULSESCAN
            smart contract. This verification will be linked to an PULSESCAN account. Once a user has claimed ownership of an
            address, the user will be able to update token information and address name tags without needing to sign a new message
            each time. Find out more about verify address ownership. */}
        </p>
      </VerifiedTitle>
      <div className="overview_info_content verified_addresses_content">
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
            page={params.page}
            page_size={params.page_size}
            showSizeChange={false}
            showTotal={`${listAddressVerify.total || 0} items`}
            onChange={({ page, page_size }) => {
              setParams((prev) => {
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
