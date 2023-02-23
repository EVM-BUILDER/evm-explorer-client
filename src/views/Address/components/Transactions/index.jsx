import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Menu } from 'antd'
import { ArrowLeftOutlined, ArrowRightOutlined, ContainerOutlined, EyeOutlined } from '@ant-design/icons'
import { Link } from 'components/Link'
import DropdownBase from 'components/Dropdown/DropdownBase'
import TableBase from 'components/Table/TableBase'
import { LampBlueIcon } from 'widgets/Svg'
import useFetchTxsByAddress from 'redux/transactions/hooks/useFetchTxsByAddress'
import FormatAmount from 'components/FormatAmount'
import FormatTimeAgo from 'components/FormatTimeAgo'
import { roundNumber } from 'library/helpers/Number'
import BoxInOut from 'components/BoxInOut'
import { useSettings } from 'redux/settings/hooks'

const Transactions = ({ address }) => {
    const { chain } = useSettings()
    const { txsByAddress } = useFetchTxsByAddress(address, 1, 25)

    console.log('txsByAddress', txsByAddress)

    const columns = [
        {
            title: 'Txn Hash',
            dataIndex: 'h',
            render: (hash) => (
                <div className="data-txnHash">
                    <div>
                        <EyeOutlined />
                    </div>
                    <Link href={`/tx/${hash}`}>{hash}</Link>
                </div>
            ),
        },
        {
            title: 'Method ',
            dataIndex: 'm',
            render: (text) => (text ? <div className="data-method">{text}</div> : ''),
        },
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
            render: (text) => (
                <div className="data-age">
                    <FormatTimeAgo value={text * 1000} />
                </div>
            ),
        },
        {
            title: 'From',
            dataIndex: 'f',
            filters: [],
            filterSearch: true,
            onFilter: (value, record) => record.address.indexOf(value) === 0,
            render: (text, record) => <BoxInOut type="from" address={address} f={record.f} t={record.t} />,
        },
        {
            title: 'To',
            dataIndex: 't',
            filters: [],
            onFilter: (value, record) => record.address.indexOf(value) === 0,
            render: (_, record) => {
                if (record?.ca) {
                    return (
                        <div className="data-to">
                            <div>
                                <ContainerOutlined />
                            </div>
                            <BoxInOut type="to" isContract address={address} f={record.f} t={record.ca} hideInOut />
                        </div>
                    )
                }
                if (record?.t) {
                    return (
                        <div className="data-to">
                            <BoxInOut type="to" address={address} f={record.f} t={record.t} hideInOut />
                        </div>
                    )
                }
                return ''
            },
        },
        {
            title: 'Value',
            dataIndex: 'v',
            render: (text) => (
                <div className="data-value">
                    <FormatAmount
                        value={roundNumber(text, { decimals: 18, scale: 5 })}
                        suffix={` ${chain?.native?.symbol || ''}`}
                        nullValue="0"
                    />
                </div>
            ),
        },
        {
            title: '[Txn Fee]',
            dataIndex: 'tf',
            render: (text) => (
                <div className="data-txnfee">
                    <Link className="data-txnfee-link">{(text / 1e18)?.toFixed(5)} </Link>
                    {/* <LampBlueIcon /> */}
                </div>
            ),
        },
    ]

    return (
        <div className="accounts_txs">
            <div className="card-content-text">
                <span>
                    Latest 25 from a total of{` `}
                    <Link href={`/txs?a=${address}`} className="card-content-text-transactions">
                        <FormatAmount value={txsByAddress?.total} nullValue="0" />
                    </Link>
                    {` `}
                    transactions
                </span>
                <div className="card-content-right">
                    {/* <DropdownBase
            trigger={['click']}
            overlay={
              <Menu className="accounts_dropdown_txs_menu">
                <Menu.Item key="0">
                  <Link href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256z" />
                    </svg>
                    <div> View Completed Txns</div>
                  </Link>
                </Menu.Item>
                <Menu.Item key="1">
                  <Link href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256z" />
                    </svg>
                    <div> View Pending Txns</div>
                  </Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM232 152C232 138.8 242.8 128 256 128s24 10.75 24 24v128c0 13.25-10.75 24-24 24S232 293.3 232 280V152zM256 400c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 385.9 273.4 400 256 400z" />
                    </svg>
                    <div> View Failed Txns</div>
                  </Link>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="3">
                  <Link href="#">
                    <ArrowRightOutlined />
                    <div> View Outgoing Txns</div>
                  </Link>
                </Menu.Item>
                <Menu.Item key="4">
                  <Link href="#">
                    <ArrowLeftOutlined />
                    <div> View Incoming Txns</div>
                  </Link>
                </Menu.Item>
                <Menu.Item key="5">
                  <Link href="#">
                    <ContainerOutlined />
                    <div>View Contract Creation</div>
                  </Link>
                </Menu.Item>
              </Menu>
            }
          >
            <div className="ant-dropdown-link">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect y="20" width="20" height="20" rx="4" transform="rotate(-90 0 20)" fill="#EEEEEE" />
                <circle cx="5" cy="10" r="2" transform="rotate(-90 5 10)" fill="#3C3A3A" />
                <circle cx="10" cy="10" r="2" transform="rotate(-90 10 10)" fill="#3C3A3A" />
                <circle cx="15" cy="10" r="2" transform="rotate(-90 15 10)" fill="#3C3A3A" />
              </svg>
            </div>
          </DropdownBase> */}
                </div>
            </div>
            <div className="card-content-table">
                <TableBase
                    columns={columns}
                    loading={txsByAddress?.loading}
                    scroll={{ x: 700 }}
                    dataSource={txsByAddress?.data || []}
                />
            </div>
            {/* <div className="card-content-footer">
        <div className="content-footer-text">
          <span className="content-footer-text-right">
            [ Download
            <Link href="#">CSV Export</Link>
            &nbsp;
            <span>
              <DownloadOutlined />
            </span>
            ]
          </span>
        </div>
      </div> */}
        </div>
    )
}

export default Transactions
