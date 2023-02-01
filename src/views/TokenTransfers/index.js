import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Table } from 'antd'
import { useRouter } from 'next/router'
import { BsEye } from 'react-icons/bs'
import PublicLayoutBlock from 'layouts/PublicLayoutBlock'
import { Link } from 'components/Link'
import { formatCode, removeEmpty } from 'library/helpers/CommonHelper'
import TablePagination from 'components/TablePagination/TablePagination'
import ReactTimeAgo from 'react-time-ago/commonjs/ReactTimeAgo'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTxsErc20 } from 'redux/token/actions'
import { useAds } from 'redux/statistics/hooks'
import { useSettings } from 'redux/settings/hooks'

const DEFAULT_LIMIT = 25

const TokenTransfers = () => {
  const dispatch = useDispatch()
  const { query } = useRouter()

  const { allTxnsErc20 } = useSelector((state) => state.Token)

  const { chain } = useSettings()
  const { adsText } = useAds()

  // handle params with url
  const [paramsListTxn, setParamsListTxn] = useState({
    page: query?.page || 1,
    page_size: query?.page_size || DEFAULT_LIMIT,
    status_url: true, // for check is handle url done will fetch api
  })

  useEffect(() => {
    setParamsListTxn((prev) => ({
      ...prev,
      status_url: '',
    }))
  }, [query])

  useEffect(() => {
    if (!paramsListTxn.status_url) {
      dispatch(getAllTxsErc20(removeEmpty(paramsListTxn)))
    }
  }, [dispatch, paramsListTxn])

  const handleChangePagination = (key) => {
    switch (key) {
      case 'first':
        setParamsListTxn({
          ...paramsListTxn,
          page: 1,
        })
        break
      case 'previous':
        setParamsListTxn({
          ...paramsListTxn,
          page: paramsListTxn?.page - 1,
        })
        break
      case 'next':
        setParamsListTxn({
          ...paramsListTxn,
          page: paramsListTxn?.page + 1,
        })
        break
      case 'last':
        setParamsListTxn({
          ...paramsListTxn,
          page:
            allTxnsErc20?.total % paramsListTxn?.page_size > 0
              ? Math.floor((allTxnsErc20?.total / paramsListTxn?.page_size) * 1) + 1
              : Math.floor((allTxnsErc20?.total / paramsListTxn?.page_size) * 1),
        })
        break
    }
  }

  const handleChangeShow = (value) => {
    setParamsListTxn({
      ...paramsListTxn,
      page_size: value,
    })
  }

  const columns = [
    {
      title: 'Txn Hash',
      dataIndex: 'h',
      with: 200,
      render: (text) => (
        <div className="data-txnHash">
          <BsEye />
          <Link href={`/tx/${text}`}>{formatCode(text, 13, 0)}</Link>
        </div>
      ),
    },
    {
      title: 'Age',
      dataIndex: 'ti',
      with: 150,
      render: (text) => <ReactTimeAgo date={parseInt(text) * 1000} locale="en-US" timeStyle="round" />,
    },
    {
      title: 'From',
      dataIndex: 'f',
      with: 200,
      render: (f) => (
        <div className="data-from">
          <Link href={`/address/${f?.a}`} className="data-from-link">
            {formatCode(f?.a || '', 13, 0)}
          </Link>
        </div>
      ),
    },
    {
      title: 'To',
      dataIndex: 't',
      with: 200,
      render: (t) => (
        <div className="data-to">
          {t?.a && (
            <>
              <img src="/images/icon/arrow-right.svg" alt="" />
              <Link href={`/address/${t?.a}`} className="data-to-link">
                {formatCode(t?.a || '', 16, 0)}
              </Link>
            </>
          )}
        </div>
      ),
    },
    {
      title: 'Value',
      dataIndex: 'v',
      with: 120,
      render: (v) => (
        <div className="data-value">
          {(v / 1e18).toLocaleString('en-GB', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 5,
          }) || 0}
        </div>
      ),
    },
    {
      title: 'Token',
      dataIndex: 'ca',
      with: 120,
      render: (ca) => (
        <div className="data-token">
          <Link href={`/token/${ca?.a}`}>
            <img src={ca?.pro?.ico || '/images/icon/empty-token.webp'} alt="" />
            <span>{ca?.pro?.na || 'Unknown'}</span>
          </Link>
        </div>
      ),
    },
  ]

  return (
    <div className="token-transfer-wrapper">
      <div className="container ">
        <div className="token-transfer-heading">
          <h1>
            <span>Token Transfers</span>
            {chain && (
              <Link href="/tokens">
                <Button>{chain?.erc20}</Button>
              </Link>
            )}
          </h1>
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
        <div className="token-transfer-bottom">
          <div className="token-transfer-card">
            <div className="token-transfer-card-body">
              <div className="card-body-header">
                <Row>
                  <Col xs={{ span: 24 }} md={{ span: 12 }}>
                    <p className="token-transfer-info">A total of &gt; {allTxnsErc20?.total} txns found</p>
                    <p className="token-transfer-show">(Showing the last 10,000 records only)</p>
                  </Col>
                  <Col xs={{ span: 24 }} md={{ span: 12 }} className="header-pagination">
                    <TablePagination
                      total={allTxnsErc20?.total || 0}
                      pageSize={paramsListTxn?.page_size || allTxnsErc20?.page_size || 25}
                      page={paramsListTxn?.page || allTxnsErc20?.page || 1}
                      onChange={handleChangePagination}
                      disableShow={true}
                    />
                  </Col>
                </Row>
              </div>
              <div className="card-body-center">
                <Table
                  columns={columns}
                  loading={allTxnsErc20?.loading || false}
                  rowKey={(record) => record?._id?.$oid}
                  dataSource={[...(allTxnsErc20?.data || [])]}
                  pagination={false}
                />
              </div>
              <div className="card-footer">
                <TablePagination
                  total={allTxnsErc20?.total || 0}
                  pageSize={paramsListTxn?.page_size || allTxnsErc20?.page_size || 25}
                  page={paramsListTxn?.page || allTxnsErc20?.page || 1}
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

TokenTransfers.Layout = PublicLayoutBlock
export default TokenTransfers
