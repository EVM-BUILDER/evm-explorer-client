import { Tabs } from 'antd'
import TabPane from 'antd/lib/tabs/TabPane'
import Link from 'next/link'
import router, { useRouter } from 'next/router'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTopNetworks, getTopTokens, getTopTransactions } from 'redux/statistics/actions'

const TopStatistics = () => {
  const dispatch = useDispatch()
  const { topTransactions, topTokens, topNetworks } = useSelector((state) => state.Statistics)
  const { settings } = useSelector((state) => state.Settings)

  const { query } = useRouter()

  const [paramsStatistics, setParamsStatistics] = React.useState({
    day: query?.day || 1,
  })

  React.useEffect(() => {
    dispatch(getTopTransactions(paramsStatistics))
    dispatch(getTopTokens(paramsStatistics))
    dispatch(getTopNetworks(paramsStatistics))
  }, [paramsStatistics])

  const handleChangeFilterDate = (value) => {
    setParamsStatistics({
      ...paramsStatistics,
      day: value,
    })
  }

  const tableTransactions = () => {
    const dataTransactions = topTransactions?.slice(0, 4) || [];
    return (
      <table className="topstatistics-transaction">
        <tbody>
          <tr>
            <th>Transactions</th>
            {/* <th>
              <Link href="top-transactions">View top 10</Link>
            </th> */}
          </tr>
          {dataTransactions?.map((transaction) => {
            return (
              <>
                <tr>
                  <td>Top {settings?.chain?.native?.symbol || ''} Sender</td>
                  <td>Total {settings?.chain?.native?.symbol || ''}</td>
                </tr>
                <tr>
                  <td className="green">FTX Exchange 2</td>
                  <td>
                    <img alt="" src="/images/icon/cryptocurrency_eth.png" className="crypto" /> {(transaction?.v / 1e18).toLocaleString('en-GB', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 5,
                    }) || 0}
                  </td>
                </tr>
              </>
            )
          })}
        </tbody>
      </table>
    )
  }

  const tableTokens = () => {
    const dataTokens = topTokens?.slice(0, 4) || [];
    return (
      <table className="topstatistics-tokens">
        <tbody>
          <tr>
            <th>Tokens</th>
            {/* <th>
              <Link href="top-tokens">View top 10</Link>
            </th> */}
          </tr>
          {dataTokens?.map((token) => {
            return (
              <>
                <tr>
                  <td>Top Unique Sender</td>
                  <td>Total {settings?.chain?.native?.symbol || ''}</td>
                </tr>
                <tr>
                  <td className="green">
                    <img src={token?.pro?.ico || '/images/icon/empty-token.webp'} alt="" />
                    {token?.pro?.na || ""}{token?.pro?.sym ? `(${token?.pro?.sym})` : ""}
                  </td>
                  <td>{(token?.v / 1e18).toLocaleString('en-GB', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 5,
                  }) || 0}</td>
                </tr>
              </>
            )
          })}
        </tbody>
      </table>
    )
  }

  const tableNetwork = () => {
    const dataNetworks = topNetworks?.slice(0, 4) || [];
    return (
      <table className="topstatistics-network">
        <tbody>
          <tr>
            <th>Network</th>
            {/* <th>
              <Link href="top-networks">View top 10</Link>
            </th> */}
          </tr>
          {dataNetworks?.map((token) => {
            return (
              <>
                <tr>
                  <td>Top Gas Used</td>
                  <td>Gas Used</td>
                </tr>
                <tr>
                  <td className="green">Optimism: Sequencer</td>
                  <td>{(token?.gu / 1e18).toLocaleString('en-GB', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 5,
                  }) || 0}</td>
                </tr>
              </>
            )
          })}
        </tbody>
      </table>
    )
  }

  const filterDate = () => {
    return (
      <ul className="topstatistics-time">
        <li onClick={() => handleChangeFilterDate(1)} className={paramsStatistics?.day * 1 === 1 ? 'item active' : 'item'}>
          24 hours
        </li>
        <li onClick={() => handleChangeFilterDate(3)} className={paramsStatistics?.day * 1 === 3 ? 'item active' : 'item'}>
          3 Days
        </li>
        <li onClick={() => handleChangeFilterDate(7)} className={paramsStatistics?.day * 1 === 7 ? 'item active' : 'item'}>
          7 Days
        </li>
      </ul>
    )
  }

  return (
    <div className="topstatistics-wrapper">
      <div className="topstatistics-heading">
        <h1>Top Statistics</h1>
      </div>

      <Tabs>
        <TabPane tab="Overview" key="all">
          {filterDate()}
          <div className="topstatistics-content">
            {tableTransactions()}
            {tableTokens()}
            {tableNetwork()}
          </div>
        </TabPane>
        <TabPane tab="Transaction" key="transaction">
          {filterDate()}
          <div className="topstatistics-content">{tableTransactions()}</div>
        </TabPane>
        <TabPane tab="Tokens" key="token">
          {filterDate()}
          <div className="topstatistics-content">{tableTokens()}</div>
        </TabPane>
        <TabPane tab="Network" key="network">
          {filterDate()}
          <div className="topstatistics-content">{tableNetwork()}</div>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default TopStatistics
