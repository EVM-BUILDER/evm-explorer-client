import React, { useEffect, useState } from 'react'
import { Dropdown, Col, Row, Table, Space, Tooltip } from 'antd'
import { DownOutlined, UnlockOutlined, FileTextOutlined, ThunderboltOutlined, ToolOutlined } from '@ant-design/icons'
import { EyeOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import PublicLayoutBlock from 'layouts/PublicLayoutBlock'
import { Link } from 'components/Link'
import { formatCode, removeEmpty } from 'library/helpers/CommonHelper'
import { useDispatch, useSelector } from 'react-redux'
import { getListContractsVerified } from 'redux/verifyContract/actions'
import TableBase from 'components/Table/TableBase'
import Pagination from 'components/Table/Pagination'

const DEFAULT_LIMIT = 25

const ContractsVerifiedModule = () => {
  const dispatch = useDispatch()
  const { query } = useRouter()

  const { contractsVerified } = useSelector((state) => state.VerifyContract)

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
      dispatch(getListContractsVerified(removeEmpty(paramsListTxn)))
    }
  }, [dispatch, paramsListTxn])

  const columns = [
    {
      title: 'Address',
      dataIndex: 'a',
      with: 200,
      render: (text) => (
        <div className="data-txnHash">
          <EyeOutlined />
          <Link href={`/address/${text.a}`}>{formatCode(text.a, 13, 0)}</Link>
        </div>
      ),
    },
    {
      title: 'Contract Name',
      dataIndex: 'cn',
      with: 180,
      render: (text) => text || '-',
    },
    {
      title: 'Compiler',
      dataIndex: 'com',
      with: 150,
      render: (text) => text || '-',
    },
    {
      title: 'Version',
      dataIndex: 'ver',
      with: 100,
      render: (text) => text || '-',
    },
    {
      title: 'Balance',
      dataIndex: 'v',
      with: 180,
      render: (v) => (
        <div className="data-value">
          {v
            ? (v / 1e18).toLocaleString('en-GB', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 5,
              })
            : '-'}
        </div>
      ),
    },
    {
      title: 'Txns',
      dataIndex: 'tt',
      render: (text) => text || '-',
    },
    {
      title: 'Setting',
      dataIndex: 'ca',
      with: 120,
      render: (ca) => (
        <div className="data-setting">
          <Tooltip placement="top" title="Optimization Enabled">
            <ThunderboltOutlined />
          </Tooltip>
          <Tooltip placement="top" title="Constructor Arguments">
            <ToolOutlined />
          </Tooltip>
        </div>
      ),
    },
    {
      title: 'Verified',
      dataIndex: 'time',
      with: 120,
      render: (text) => text || '-',
    },
    {
      title: (
        <>
          Audited <img src="/images/icon/info-circle.svg" alt="" />
        </>
      ),
      dataIndex: 'au',
      with: 120,
      render: (text) => text || '-',
    },
    {
      title: (
        <>
          License <img src="/images/icon/info-circle.svg" alt="" />
        </>
      ),
      dataIndex: 'lc',
      with: 120,
      render: (text) => text || '-',
    },
  ]

  const items = [
    {
      label: <Link href={`/contractsVerified`}>Latest 500 Contracts Verified</Link>,
      text: <>Latest 500 Contracts Verified</>,
      key: 'latest',
    },
    {
      type: 'divider',
    },
    {
      label: (
        <Link href={`/contractsVerified?filter=opensourcelicense`}>
          <UnlockOutlined /> Open Source License
        </Link>
      ),
      text: (
        <>
          <UnlockOutlined /> Open Source License
        </>
      ),
      key: 'opensourcelicense',
    },
    {
      type: 'divider',
    },
    {
      label: (
        <Link href={`/contractsVerified?filter=solc`}>
          <img src="/images/logo/solidity.png?v=0.0.2" alt="" width="13" /> Solidity Compiler
        </Link>
      ),
      text: (
        <>
          <img src="/images/logo/solidity.png?v=0.0.2" alt="" width="13" /> Solidity Compiler
        </>
      ),
      key: 'solc',
    },
    {
      label: (
        <Link href={`/contractsVerified?filter=vyper`}>
          <img src="/images/logo/vyper.webp?v=0.0.2" alt="" width="13" /> Vyper Compiler
        </Link>
      ),
      text: (
        <>
          <img src="/images/logo/vyper.webp?v=0.0.2" alt="" width="13" /> Vyper Compiler
        </>
      ),
      key: 'vyper',
    },
    {
      label: (
        <Link href={`/contractsVerified?filter=audit`}>
          <FileTextOutlined /> Contract Security Audit
        </Link>
      ),
      text: (
        <>
          <FileTextOutlined /> Contract Security Audit
        </>
      ),
      key: 'audit',
    },
  ]

  let currentFilter = 'Latest 500 Contracts Verified'

  if (query?.filter) {
    currentFilter = items?.find((it) => it?.key === query?.filter)?.text
  }

  // console.log('contractsVerified', contractsVerified)

  return (
    <div className="contracts-verified-wrapper">
      <div className="container ">
        <div className="contracts-verified-heading">
          <h1>
            <span>Contracts </span>
            <span className="small text-secondary">With verified source codes only</span>
          </h1>
        </div>
        <div className="contracts-verified-bottom">
          <div className="contracts-verified-card">
            <div className="contracts-verified-card-body">
              <div className="card-body-header">
                <div className="fiter-contracts">
                  <Dropdown menu={{ items }} trigger={['click']}>
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>
                        <span>Select View / Filter Type </span>
                        <span>{currentFilter}</span>
                        <DownOutlined />
                      </Space>
                    </a>
                  </Dropdown>
                </div>
                <Row>
                  <Col xs={{ span: 24 }} md={{ span: 12 }}>
                    <p className="contracts-verified-info">
                      More than &gt; {contractsVerified?.total} verified contracts source code found
                    </p>
                    <p className="contracts-verified-show">(Showing the last 500 verified contracts source code)</p>
                  </Col>
                  <Col xs={{ span: 24 }} md={{ span: 12 }} className="header-pagination">
                    <Pagination
                      total={contractsVerified?.total || 0}
                      page={paramsListTxn.page}
                      page_size={paramsListTxn.page_size}
                      showSizeChange={false}
                      onChange={({ page, page_size }) => {
                        setParamsListTxn((prev) => {
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
                  dataSource={contractsVerified?.data || []}
                  loading={contractsVerified?.loading || false}
                  scroll={{ x: 800 }}
                  pagination={{
                    total: contractsVerified?.total || 0,
                    page: paramsListTxn?.page,
                    page_size: paramsListTxn?.page_size,
                    onChange: ({ page, page_size }) => {
                      setParamsListTxn((prev) => ({
                        ...prev,
                        page,
                        page_size,
                      }))
                    },
                    onChangeSize: (page_size) => {
                      setParamsListTxn((prev) => ({
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

ContractsVerifiedModule.Layout = PublicLayoutBlock
export default ContractsVerifiedModule
