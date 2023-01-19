import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { Row, Col } from 'antd'

import { Link } from 'components/Link'
import PublicLayoutBlock from 'layouts/PublicLayoutBlock'
import { formatCode, numberFormatter, removeEmpty } from 'library/helpers/CommonHelper'

import { getTopAccounts } from 'redux/accounts/actions'
import { getListStatistics } from 'redux/statistics/actions'
import { roundNumber } from 'library/helpers/Number'
import FormatAmount from 'components/FormatAmount'
import Pagination from 'components/Table/Pagination'
import TableBase from 'components/Table/TableBase'
import { useAds } from 'redux/statistics/hooks'

const AccountModule = () => {
  const dispatch = useDispatch()
  const { query } = useRouter()
  const { topAccounts } = useSelector((state) => state.Accounts)
  const { settings } = useSelector((state) => state.Settings)

  const { adsText } = useAds()

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

  // get Statistic
  useEffect(() => {
    dispatch(getListStatistics({ page: 1, page_size: 1 }))
  }, [dispatch])

  const columns = [
    {
      title: 'Rank',
      dataIndex: 'r',
      render: (text, record, index) => <div className="text-primary">#{index + 1}</div>,
    },
    {
      title: 'Address',
      dataIndex: 'a',
      render: (text) => (
        <div className="account-address">
          <img src="/images/icon/folder.svg" alt="" />
          <Link href={`/address/${text}`}>{formatCode(text, 10, 5)}</Link>
        </div>
      ),
    },
    {
      title: 'Name Tag',
      dataIndex: 'nt',
    },
    {
      title: <div className="balance-title">Balance</div>,
      dataIndex: 'v',
      render: (text) => (
        <FormatAmount value={roundNumber(text, { decimals: 18 })} suffix={` ${settings?.chain?.native?.symbol || ''}`} />
      ),
    },
    {
      title: 'Percentage',
      dataIndex: 'p',

      render: (text) => (text ? text : 0),
    },
    {
      title: 'Txn Count',
      dataIndex: 'tt',

      render: (text) => <div className="text-right">{numberFormatter(text * 1, 2)}</div>,
    },
  ]

  return (
    <div className="accounts-wrapper">
      <div className="container">
        <div className="account__heading">
          <h1>Top Accounts by {settings?.chain?.native?.symbol || ''} Balance</h1>
        </div>
        {adsText && (
          <p className="ads-text">
            {adsText.text}{' '}
            {adsText.url && (
              <Link href={adsText.url} target="_blank" rel="noreferrer">
                View now !
              </Link>
            )}
          </p>
        )}
        <div className="account__bottom">
          <div className="card">
            <div className="card-body">
              <div className="card-body-header">
                <Row gutter={[{ xs: 6 }, { xs: 6 }]}>
                  <Col xs={{ span: 24 }} md={{ span: 12 }}>
                    <p className="txs-info">More than &gt; {topAccounts?.total || 0} accounts found</p>
                    <p className="txs-show">(Showing the last 500k records)</p>
                  </Col>
                  <Col xs={{ span: 24 }} md={{ span: 12 }} className="header-pagination">
                    <Pagination
                      total={topAccounts?.total}
                      page={paramsTopAccount?.page}
                      page_size={paramsTopAccount?.page_size}
                      showSizeChange={false}
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
                  </Col>
                </Row>
              </div>
              <div className="card-body-center">
                <TableBase
                  columns={columns}
                  dataSource={topAccounts?.data || []}
                  loading={topAccounts?.loading}
                  scroll={{ x: 700 }}
                  pagination={{
                    total: topAccounts?.total,
                    page: paramsTopAccount?.page,
                    page_size: paramsTopAccount?.page_size,
                    onChange: ({ page, page_size }) => {
                      setParamsTopAccount((prev) => ({
                        ...prev,
                        page,
                        page_size,
                      }))
                    },
                    onChangeSize: (page_size) => {
                      setParamsTopAccount((prev) => ({
                        ...prev,
                        page_size,
                      }))
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

AccountModule.Layout = PublicLayoutBlock
export default AccountModule
