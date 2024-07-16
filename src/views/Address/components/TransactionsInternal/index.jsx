import React from 'react'
import { useSelector } from 'react-redux'
import { Space, Switch } from 'antd'
import { Link } from 'components/Link'
import TableBase from 'components/Table/TableBase'
import { ContractIcon, RoundArrowIcon } from 'widgets/Svg'
import { useFetchTxsErc20 } from 'redux/token/hooks/useFetchTxsErc20'
import FormatTimeAgo from 'components/FormatTimeAgo'
import FormatAmount from 'components/FormatAmount'
import { roundNumber } from 'library/helpers/Number'
import { ADDRESS_TYPE } from 'redux/constants'

const InternalTransactions = ({ address }) => {
    const nativeToken = useSelector((state) => state.Settings?.settings?.chain?.native)
    // const { txsErc20 } = useFetchTxsErc20(address)

    const columns = [
        {
            title: 'Parent Txn Hash',
            dataIndex: 'h',
            render: (text) => (
                <div className="data-txnHash">
                    <Link href={`/tx/${text}`}>{text}</Link>
                </div>
            ),
        },
        {
            title: 'Block',
            dataIndex: 'bn',
            render: (text) => (
                <div className="data-age">
                    <Link href={`/block/${text}`}>{text}</Link>
                </div>
            ),
        },
        {
            title: 'Age',
            dataIndex: 'ti',
            render: (text) => (
                <div className="data-from">
                    <FormatTimeAgo value={text * 1000} />
                </div>
            ),
        },
        {
            title: 'From',
            dataIndex: 'f',
            render: (text) => (
                <div className="data-from">
                    <ContractIcon />
                    {text?.a?.toLowerCase() === address?.toLowerCase() ? (
                        <span className="data-from">{text?.a}</span>
                    ) : (
                        <Link className="data-from link" href={`/address/${text?.a}`}>
                            {text?.a}
                        </Link>
                    )}
                </div>
            ),
        },
        {
            title: 'To',
            dataIndex: 't',
            render: (text) => (
                <div className="data-to">
                    <RoundArrowIcon />
                    <Link className="data-to-link" href={`/address/${text?.a}`}>
                        {text?.a}
                    </Link>
                </div>
            ),
        },
        {
            title: 'Value',
            dataIndex: 'v',
            render: (text) => (
                <div className="data-value">
                    <FormatAmount
                        value={roundNumber(text, { decimals: 18, scale: 10 })}
                        suffix={` ${nativeToken?.symbol || ''}`}
                        nullValue="0"
                    />{' '}
                </div>
            ),
        },
    ]

    return (
        <div className="accounts_internal_txs">
            Coming soon
            {/* <div className="card-content-text">
        <Space>
          <span>Latest 1 internal transaction</span>
          <Switch size="small" />
        </Space>
      </div>
      <div className="card-content-table">
        <TableBase columns={columns} loading={txsErc20?.loading}
                  scroll={{ x: 700 }}
         dataSource={txsErc20?.data || []} />
      </div> */}
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

export default InternalTransactions
