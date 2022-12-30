import React, { useEffect, useState } from 'react'
import { Col, Row, Table } from 'antd'
import { useRouter } from 'next/router'
import { BsEye, BsFileCode, BsFileFill, BsFileText, BsFileTextFill, BsFillArrowRightCircleFill } from 'react-icons/bs'
import PublicLayoutBlock from 'layouts/PublicLayoutBlock'
import { Link } from 'components/Link'
import { formatCode, removeEmpty } from 'library/helpers/CommonHelper'
import TablePagination from 'components/TablePagination/TablePagination'
import ReactTimeAgo from 'react-time-ago/commonjs/ReactTimeAgo'
import { useDispatch, useSelector } from 'react-redux'
import { getListTransactions } from 'redux/transactions/actions'
import { getListStatistics } from 'redux/statistics/actions'
import { useAds } from 'redux/statistics/hooks'
import { ArrowRightFill } from 'widgets/Svg'

const DEFAULT_LIMIT = 25

const TransactionsModule = () => {
  const dispatch = useDispatch()
  const { query } = useRouter()

  const { settings } = useSelector((state) => state.Settings)
  const { transactions, page, page_size, total, loading } = useSelector((state) => state.Transactions)

  const { adsText } = useAds()

  // handle params with url
  const [paramsListBlock, setParamsListBlock] = useState({
    page: query?.page || 1,
    page_size: query?.page_size || DEFAULT_LIMIT,
    block_number: query.block,
    a: query.a,
    status_url: true, // for check is handle url done will fetch api
  })
  useEffect(() => {
    setParamsListBlock((prev) => ({
      ...prev,
      block_number: query.block,
      a: query.a,
      status_url: '',
    }))
  }, [query])
  useEffect(() => {
    if (!paramsListBlock.status_url) {
      dispatch(getListTransactions(removeEmpty(paramsListBlock)))
    }
  }, [dispatch, paramsListBlock])

  // get Statistic
  useEffect(() => {
    dispatch(getListStatistics({ page: 1, page_size: 1 }))
  }, [dispatch])

  const handleChangePagination = (key) => {
    switch (key) {
      case 'first':
        setParamsListBlock({
          ...paramsListBlock,
          page: 1,
        })
        break
      case 'previous':
        setParamsListBlock({
          ...paramsListBlock,
          page: paramsListBlock?.page - 1,
        })
        break
      case 'next':
        setParamsListBlock({
          ...paramsListBlock,
          page: paramsListBlock?.page + 1,
        })
        break
      case 'last':
        setParamsListBlock({
          ...paramsListBlock,
          page:
            total % paramsListBlock?.page_size > 0
              ? Math.floor((total / paramsListBlock?.page_size) * 1) + 1
              : Math.floor((total / paramsListBlock?.page_size) * 1),
        })
        break
    }
  }

  const handleChangeShow = (value) => {
    setParamsListBlock({
      ...paramsListBlock,
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
      title: (
        <div className="title-method">
          Method <img src="/images/icon/info-circle.svg" alt="" />
        </div>
      ),
      dataIndex: 'm',
      with: 150,
      render: (text, row) => <div className="data-method">{text || formatCode(row?.i, 10, 0, '')}</div>,
    },
    {
      title: 'Block',
      dataIndex: 'bn',
      with: 150,
      render: (bn) => (
        <Link className="data-block" href={`/block/${bn}`}>
          {bn}
        </Link>
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
      render: (_, record) => {
        return (
          <div className="data-to">
            <ArrowRightFill className="arrow-right-icon" />
            {record?.t || record?.ca ? (
              <div className="file-address">
                {record?.ca?.pro && <BsFileTextFill />}
                <Link href={`/address/${record?.t?.a}`} className="data-to-link">
                  {record?.ca?.pro ? record?.ca?.pro?.na : formatCode(record?.t?.a || '', 16, 0)}
                </Link>
              </div>
            ) : (
              'Unknown'
            )}
          </div>
        )
      },
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
          }) || 0}{' '}
          {settings?.chain?.native?.symbol || ''}{' '}
        </div>
      ),
    },
    {
      title: 'Txn Fee',
      dataIndex: 'tf',
      with: 120,
      render: (tf) => (
        <div className="data-txnfee">
          <span>
            {((tf * 1) / 1e18).toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 5,
            })}
          </span>
          {/* <img src="/images/icon/lamp-charge.svg" alt="" /> */}
        </div>
      ),
    },
  ]

  return (
    <div className="txs-wrapper">
      <div className="container ">
        <div className="txs-heading">
          <h1>Transactions</h1>
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
        <div className="txs-bottom">
          <div className="txs-card">
            <div className="txs-card-body">
              <div className="card-body-header">
                <Row>
                  <Col xs={{ span: 24 }} md={{ span: 12 }}>
                    <p className="txs-info">More than &gt; {total} transactions found</p>
                    <p className="txs-show">(Showing the last 500k records)</p>
                  </Col>
                  <Col xs={{ span: 24 }} md={{ span: 12 }} className="header-pagination">
                    <TablePagination
                      total={total || 0}
                      pageSize={paramsListBlock?.page_size || page_size}
                      page={paramsListBlock?.page || page}
                      onChange={handleChangePagination}
                      disableShow={true}
                    />
                  </Col>
                </Row>
              </div>
              <div className="card-body-center">
                <Table
                  columns={columns}
                  loading={loading}
                  rowKey={(record) => record?._id?.$oid}
                  dataSource={[...(transactions || [])]}
                  pagination={false}
                />
              </div>
              <div className="card-footer">
                <TablePagination
                  total={total || 0}
                  pageSize={paramsListBlock?.page_size || page_size}
                  page={paramsListBlock?.page || page}
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

TransactionsModule.Layout = PublicLayoutBlock
export default TransactionsModule
