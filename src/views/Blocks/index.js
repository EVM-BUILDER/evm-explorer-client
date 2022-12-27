import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Row, Col } from 'antd'
import { useRouter } from 'next/router'
import ReactTimeAgo from 'react-time-ago'
import CurrencyFormat from 'react-currency-format'
import Link from 'components/Link/Link'
import PublicLayoutBlock from 'layouts/PublicLayoutBlock'
import TablePagination from 'components/TablePagination/TablePagination'
import { getListBlocks } from 'redux/blocks/actions'
import { removeEmpty } from 'library/helpers/CommonHelper'
import { getListStatistics } from 'redux/statistics/actions'
import TableBase from 'components/Table/TableBase'
import { useSettings } from 'redux/settings/hooks'

const DEFAULT_LIMIT = 25

const BlocksModule = () => {
  const dispatch = useDispatch()
  const { query } = useRouter()

  const { blocks, page, page_size, total, loading } = useSelector((state) => state.Blocks)
  const settings = useSettings()

  // handle params with url
  const [paramsListBlock, setParamsListBlock] = useState({
    page: query?.page || 1,
    page_size: query?.page_size || DEFAULT_LIMIT,
    status_url: true, // for check is handle url done will fetch api
  })
  useEffect(() => {
    setParamsListBlock((prev) => ({
      ...prev,
      ...query,
      status_url: '',
    }))
  }, [query])
  useEffect(() => {
    if (!paramsListBlock.status_url) {
      dispatch(getListBlocks(removeEmpty(paramsListBlock)))
    }
  }, [dispatch, paramsListBlock])

  // get Statistic
  useEffect(() => {
    dispatch(getListStatistics({ page: 1, page_size: 1 }))
  }, [dispatch])

  // utils
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
              ? Math.floor(total / paramsListBlock?.page_size) + 1
              : Math.floor(total / paramsListBlock?.page_size),
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
      title: 'Block',
      dataIndex: 'bn',
      render: (text) => (
        <Link href={`/block/${text}`} className="data-block">
          {text}
        </Link>
      ),
    },
    {
      title: 'Age',
      dataIndex: 'ti',
      render: (text) => <ReactTimeAgo date={parseInt(text) * 1000} locale="en-US" timeStyle="round" />,
    },
    {
      title: 'Txn',
      dataIndex: 'tt',
      render: (text, record) => (
        <Link href={`/txs?block=${record.bn}`} className="data-txn">
          {text}
        </Link>
      ),
    },
    {
      title: 'Fee Recipient',
      dataIndex: 'vb',
      render: (vb) => (
        <Link href={`/address/${vb?.a}`} className="data-validator">
          {vb?.a}
        </Link>
      ),
    },
    {
      title: 'Gas Used',
      dataIndex: 'gu',
      render: (text, record) => (
        <div className="data-gasUse">
          <div>
            <CurrencyFormat value={text} displayType="text" thousandSeparator renderText={(value) => value} />{' '}
            <span className="data-gasUse-span">({(((record?.gu * 1) / record.gl) * 1 * 100).toFixed(1)}%)</span>
          </div>
          <div className="gas-process">
            <div style={{ width: `${Math.floor(((record?.gu * 1) / record.gl) * 1 * 100)}%` }} />
          </div>
        </div>
      ),
    },
    {
      title: 'Gas Limit',
      dataIndex: 'gl',
      render: (text) => <CurrencyFormat value={text} displayType="text" thousandSeparator renderText={(value) => value} />,
    },
    {
      title: 'Base Fee',
      dataIndex: 'f',
      render: (text) => {
        ;`${text || 0} Gwei`
      },
    },
    {
      title: 'Reward',
      dataIndex: 'br',
      key: 'reward',
      width: 100,
      render: (text) => text || 0,
    },
    {
      title: `Burnt Fees (${settings?.chain?.native?.symbol || ''})`,
      dataIndex: 'f',
      key: 'burntfees',
      width: 100,
      render: (text) => <div className="data-burntfees">{text || 0}</div>,
    },
  ]

  return (
    <div className="blocks-wrapper">
      <div className="container ">
        <div className="blocks-heading">
          <h1>Blocks </h1>
          <div>
            <span className="heading-network">Network Utilization: 50.9%</span>
            <Link>
              <span>Burnt Fees:</span>
              <span>-- {settings?.chain?.native?.symbol || ''}</span>
              <span> | Dashboard</span>
            </Link>
          </div>
        </div>
        <p className="blocks-desc">PulseDex presale details to be announced soon</p>
        <div className="blocks-bottom">
          <div className="blocks-card">
            <div className="block-card-body">
              <div className="card-body-header">
                <Row
                  gutter={[
                    { xs: 6, md: 12 },
                    { xs: 6, md: 12 },
                  ]}
                >
                  <Col xs={{ span: 24 }} md={{ span: 12 }}>
                    <p className="block-info">
                      Block #{blocks?.[0]?.bn || 0} to #{blocks?.[blocks?.length - 1]?.bn || 0} (Total of {total || 0} blocks)
                    </p>
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
                <TableBase
                  columns={columns}
                  dataSource={blocks || []}
                  loading={loading}
                  pagination={{
                    total,
                    page: paramsListBlock?.page,
                    page_size: paramsListBlock?.page_size,
                    onChange: ({ page, page_size }) => {
                      setParamsListBlock((prev) => ({
                        ...prev,
                        page,
                        page_size,
                      }))
                    },
                    onChangeSize: (page_size) => {
                      setParamsListBlock((prev) => ({
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

BlocksModule.Layout = PublicLayoutBlock

export default BlocksModule
