import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Table } from 'antd'
import { useRouter } from 'next/router'
import PublicLayoutBlock from 'layouts/PublicLayoutBlock'
import { Link } from 'components/Link'
import { removeEmpty } from 'library/helpers/CommonHelper'
import { roundNumber } from 'library/helpers/Number'
import TablePagination from 'components/TablePagination/TablePagination'
import { useDispatch, useSelector } from 'react-redux'
import { getListAddress } from 'redux/address/actions'
import { useAds } from 'redux/statistics/hooks'
import FormatAmount from 'components/FormatAmount'

const DEFAULT_LIMIT = 25

const TopTokensModule = () => {
  const dispatch = useDispatch()
  const { query } = useRouter()

  const { settings } = useSelector((state) => state.Settings)
  const { listAddress } = useSelector((state) => state.Address)

  const adsText = useAds()

  // handle params with url
  const [paramsListToken, setParamsListToken] = useState({
    page: query?.page || 1,
    page_size: query?.page_size || DEFAULT_LIMIT,
    orderBy: 'balance',
    sort: 'desc',
    type: 'tokenErc20',
    status_url: true, // for check is handle url done will fetch api
  })
  useEffect(() => {
    setParamsListToken((prev) => ({
      ...prev,
      status_url: '',
    }))
  }, [query])
  useEffect(() => {
    if (!paramsListToken.status_url) {
      dispatch(getListAddress(removeEmpty(paramsListToken)))
    }
  }, [dispatch, paramsListToken])

  const handleChangePagination = (key) => {
    switch (key) {
      case 'first':
        setParamsListToken({
          ...paramsListToken,
          page: 1,
        })
        break
      case 'previous':
        setParamsListToken({
          ...paramsListToken,
          page: paramsListToken?.page - 1,
        })
        break
      case 'next':
        setParamsListToken({
          ...paramsListToken,
          page: paramsListToken?.page + 1,
        })
        break
      case 'last':
        setParamsListToken({
          ...paramsListToken,
          page:
            listAddress?.total % paramsListToken?.page_size > 0
              ? Math.floor((listAddress?.total / paramsListToken?.page_size) * 1) + 1
              : Math.floor((listAddress?.total / paramsListToken?.page_size) * 1),
        })
        break
    }
  }

  const handleChangeShow = (value) => {
    setParamsListToken({
      ...paramsListToken,
      page_size: value,
    })
  }

  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      with: 200,
      render: (text, record, index) => <div className="data-rank">{index + 1}</div>,
    },
    {
      title: 'Token',
      dataIndex: 'pro',
      with: 200,
      render: (pro, record) => {
        return (
          <div className="data-token">
            <Link href={`/token/${record?.a}`}>
              <img src={pro?.ico || '/images/icon/empty-token.webp'} alt="" />
              <span>
                {pro?.na || ''} {pro?.sym && `( ${pro?.sym} )`}
              </span>
            </Link>
          </div>
        )
      },
    },
    {
      title: 'Price',
      dataIndex: 'pr',
      with: 150,
      render: (text) => text || '-',
    },
    {
      title: 'Change (%)',
      dataIndex: 'c',
      with: 200,
      render: (c) => <div className="data-change">{c || '-'}</div>,
    },
    {
      title: 'Volume (24H)',
      dataIndex: 'vl',
      with: 200,
      render: (text) => text || '-',
    },
    {
      title: 'Circulating Market Cap ',
      dataIndex: 'pro',
      with: 120,
      render: (pro) => <FormatAmount value={pro?.tsu ?? 0} />,
    },
    {
      title: 'On-Chain Market Cap ',
      dataIndex: 'pro',
      with: 120,
      render: (pro) => <FormatAmount value={pro?.tsu ?? 0} />,
    },
    {
      title: 'Holders',
      dataIndex: 'pro',
      with: 120,
      render: (pro) =>
        !isNaN(pro?.tho * 1)
          ? (pro.tho * 1).toLocaleString('en-GB', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })
          : '-',
    },
  ]

  return (
    <div className="top-tokens-wrapper">
      <div className="container ">
        <div className="top-tokens-heading">
          <h1>
            <span>Top Tokens</span>
            <Link key="PN20">
              <Button>PN20</Button>
            </Link>
          </h1>
        </div>
        {adsText && (
          <p className="top-tokens-desc">
            {adsText.text}{' '}
            {adsText.url && (
              <Link href={adsText.url} target="_blank" rel="noreferrer">
                View now !
              </Link>
            )}
          </p>
        )}
        <div className="top-tokens-bottom">
          <div className="top-tokens-card">
            <div className="top-tokens-card-body">
              <div className="card-body-header">
                <Row>
                  <Col xs={{ span: 24 }} md={{ span: 12 }}>
                    <p className="top-tokens-info">More than &gt; {listAddress?.total} txns found</p>
                    <p className="top-tokens-show">(Showing the last 10,000 records only)</p>
                  </Col>
                  <Col xs={{ span: 24 }} md={{ span: 12 }} className="header-pagination">
                    <TablePagination
                      total={listAddress?.total || 0}
                      pageSize={paramsListToken?.page_size || listAddress?.page_size || 25}
                      page={paramsListToken?.page || listAddress?.page || 1}
                      onChange={handleChangePagination}
                      disableShow={true}
                    />
                  </Col>
                </Row>
              </div>
              <div className="card-body-center">
                <Table
                  columns={columns}
                  loading={listAddress?.loading}
                  rowKey={(record) => record?._id?.$oid}
                  dataSource={[...(listAddress?.data || [])]}
                  pagination={false}
                />
              </div>
              <div className="card-footer">
                <TablePagination
                  total={listAddress?.total || 0}
                  pageSize={paramsListToken?.page_size || listAddress?.page_size || 25}
                  page={paramsListToken?.page || listAddress?.page || 1}
                  onChange={handleChangePagination}
                  onChangeShow={handleChangeShow}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

TopTokensModule.Layout = PublicLayoutBlock
export default TopTokensModule
