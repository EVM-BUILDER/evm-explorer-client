import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Pagination from 'components/Table/Pagination'
import CardOverview from '../CardOverview'
import { formatCode, removeEmpty } from 'library/helpers/CommonHelper'
import { getTopAccounts } from 'redux/accounts/actions'
import { Table } from 'antd'
import { Link } from 'components/Link'

const VerifiedTitle = styled.div`
  margin-top: 24px;
  margin-left: 24px;
  margin-right: 24px;
  font-size: 16px;
`
const VerifiedAddresses = () => {
  const dispatch = useDispatch()
  const { query } = useRouter()

  const { topAccounts } = useSelector((state) => state.Accounts)
  // console.log('topAccounts', topAccounts)

  // handle params with url
  const [paramsTopAccount, setParamsTopAccount] = useState({
    page: 1,
    page_size: 25,
    orderBy: 'balance',
    sort: 'desc',
    status_url: true, // for check is handle url done will fetch api
  })
  useEffect(() => {
    setParamsTopAccount((prev) => ({
      ...prev,
      ...query,
      status_url: '',
    }))
  }, [query])
  useEffect(() => {
    if (!paramsTopAccount.status_url) {
      dispatch(getTopAccounts(removeEmpty(paramsTopAccount)))
    }
  }, [dispatch, paramsTopAccount])

  const columns = [
    {
      title: 'Address',
      dataIndex: 'a',
      render: (text) => <Link href={`/address/${text}`}>{formatCode(text, 6, 6)}</Link>,
    },
    {
      title: 'Quick Links',
      dataIndex: 'a',
      render: (text) => text,
    },
    {
      title: 'Verified Date',
      dataIndex: 'a',
      render: (text) => text,
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
              {topAccounts?.total || 0} address verified (out of 1000 max limit)
            </span>
            <div>
              <img src="/images/account/search.png" alt="" />
            </div>
          </div>

          {topAccounts?.data?.length > 0 ? (
            <Table
              className="TableVerifyAddress"
              columns={columns}
              rowKey={(record) => record.a}
              dataSource={topAccounts?.data || []}
              loading={topAccounts.loading}
              scroll={{ x: 1024 }}
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
            total={topAccounts?.total}
            page={paramsTopAccount?.page}
            page_size={paramsTopAccount?.page_size}
            showSizeChange={false}
            showTotal={`${topAccounts?.total} items`}
            onChange={({ page, page_size }) => {
              setParamsTopAccount((prev) => {
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
