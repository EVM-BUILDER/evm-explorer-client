import React from 'react'
import { EyeOutlined } from '@ant-design/icons'
import { Link } from 'components/Link'
import useFetchTxsErc20 from 'redux/token/hooks/useFetchTxsErc20'
import TableBase from 'components/Table/TableBase'
import { BaseButton } from 'components/Button'
import FormatTimeAgo from 'components/FormatTimeAgo'
import FormatAmount from 'components/FormatAmount'
import { roundNumber } from 'library/helpers/Number'
import { useRouter } from 'next/router'
import BoxInOut from 'components/BoxInOut'
import { useSettings } from 'redux/settings/hooks'

const Transactions = ({ address }) => {
    const router = useRouter()
    const { chain } = useSettings()

    const { txsErc20, paramsTxsErc20 } = useFetchTxsErc20(address, 1, 25)

    const columns = [
        {
            title: 'Txn Hash',
            dataIndex: 'h',
            render: (text) => (
                <div className="data-txnHash">
                    <div>
                        <EyeOutlined />
                    </div>
                    <Link href={`/tx/${text}`}>{text}</Link>
                </div>
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
            render: (text, record) => <BoxInOut type="from" address={address} f={record.f} t={record.t} hideInOut />,
        },
        {
            title: 'To',
            dataIndex: 'f',
            render: (text, record) => <BoxInOut type="to" address={address} f={record.f} t={record.t} />,
        },
        {
            title: 'Value',
            dataIndex: 'v',
            render: (text, record) => (
                <div className="data-value">
                    <FormatAmount value={roundNumber(text, { decimals: record?.ca?.pro?.de, scale: 10 })} nullValue="0" />{' '}
                </div>
            ),
        },
        {
            title: 'Token',
            dataIndex: 'ca',
            render: (_, record) => (
                <div className="data-token">
                    <Link href={`/token/${record?.ca?.a}?a=${record?.ca?.a}`}>
                        <img src={record?.ca?.pro?.ico || '/images/icon/empty-token.webp'} alt="" />
                        <span>{record?.ca?.pro?.sym || 'Unknown'}</span>
                    </Link>
                </div>
            ),
        },
    ]

    return (
        <div className="accounts_txs_erc20">
            <div className="card-content-text">
                <span>
                    Latest {txsErc20?.total > paramsTxsErc20.page_size ? paramsTxsErc20.page_size : txsErc20?.total}{' '}
                    {chain?.erc20 || ''} Token Transfer Events
                </span>
                {/* <div className="card-content-right">
          <BaseButton
            size="small"
            onClick={() => {
              router.push(`/tokentxns?a=${address}`)
            }}
          >
            View All
          </BaseButton>
        </div> */}
            </div>
            <div className="card-content-table">
                <TableBase columns={columns} loading={txsErc20?.loading} scroll={{ x: 700 }} dataSource={txsErc20?.data || []} />
            </div>
        </div>
    )
}

export default Transactions
