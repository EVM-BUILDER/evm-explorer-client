import { Tabs } from 'antd'
import TabPane from 'antd/lib/tabs/TabPane'
import Link from 'next/link'
import router, { useRouter } from 'next/router'
import React from 'react'
import { useSelector } from 'react-redux'

const TopStatistics = () => {
  const { statistics } = useSelector((state) => state.Statistics)

  const { query } = useRouter();

  const [paramsStatistics, setParamsStatistics] = React.useState({
    day: query?.day || 1
  })

  React.useEffect(() => {
    if (paramsStatistics?.day !== 1) {
      router.push({
        pathname: '/topstatistics',
        query: { ...paramsStatistics },
      })
    } else {
      router.push({
        pathname: '/topstatistics',
      })
    }
  }, [paramsStatistics])

  const handleChangeFilterDate = (value) => {
    setParamsStatistics({
      ...paramsStatistics,
      day: value,
    })
  }

  const tableTransactions = () => {
    return (
      <table className="topstatistics-transaction">
        <tr>
          <th>Transactions</th>
          <th><Link href="top-transactions">View top 10</Link></th>
        </tr>
        <tr>
          <td>Top ETH Sender</td>
          <td>Total ETH</td>
        </tr>
        <tr>
          <td className="green">FTX Exchange 2</td>
          <td>
            {' '}
            <img src="/images/icon/cryptocurrency_eth.png" className="crypto" /> 147,096.946643999
          </td>
        </tr>

        <tr>
          <td>Top ETH Sender</td>
          <td>Total ETH</td>
        </tr>
        <tr>
          <td className="green">FTX Exchange 2</td>
          <td>
            <img src="/images/icon/cryptocurrency_eth.png" className="crypto" /> 147,096.946643999
          </td>
        </tr>

        <tr>
          <td>Top ETH Sender</td>
          <td>Total ETH</td>
        </tr>
        <tr>
          <td className="green">FTX Exchange 2</td>
          <td>
            {' '}
            <img src="/images/icon/cryptocurrency_eth.png" className="crypto" /> 147,096.946643999
          </td>
        </tr>

        <tr>
          <td>Top ETH Sender</td>
          <td>Total ETH</td>
        </tr>
        <tr>
          <td className="green">FTX Exchange 2</td>
          <td>
            {' '}
            <img src="/images/icon/cryptocurrency_eth.png" className="crypto" /> 147,096.946643999
          </td>
        </tr>
      </table>
    );
  };

  const tableTokens = () => {
    return (
      <table className="topstatistics-tokens">
        <tr>
          <th>Tokens</th>
          <th><Link href="top-tokens">View top 10</Link></th>
        </tr>
        <tr>
          <td>Top Unique Sender</td>
          <td>Total ETH</td>
        </tr>
        <tr>
          <td className="green">
            <img src="/images/icon/tethericon.png" className="tether" />
            Tether USD(USDT)
          </td>
          <td>201.459</td>
        </tr>

        <tr>
          <td>Top Unique Sender</td>
          <td>Total ETH</td>
        </tr>
        <tr>
          <td className="green">
            <img src="/images/icon/tethericon.png" className="tether" />
            Tether USD(USDT)
          </td>
          <td>201.459</td>
        </tr>

        <tr>
          <td>Top Unique Sender</td>
          <td>Total ETH</td>
        </tr>
        <tr>
          <td className="green">
            <img src="/images/icon/tethericon.png" className="tether" /> Tether USD(USDT)
          </td>
          <td>201.459</td>
        </tr>

        <tr>
          <td>Top Unique Sender</td>
          <td>Total ETH</td>
        </tr>
        <tr>
          <td className="green">
            <img src="/images/icon/tethericon.png" className="tether" /> Tether USD(USDT)
          </td>
          <td>201.459</td>
        </tr>
      </table>
    );
  };

  const tableNetwork = () => {
    return (
      <table className="topstatistics-network">
        <tr>
          <th>Network</th>
          <th><Link href="top-networks">View top 10</Link></th>
        </tr>
        <tr>
          <td>Top Gas Used</td>
          <td>Gas Used</td>
        </tr>
        <tr>
          <td className="green">Optimism: Sequencer</td>
          <td>147,096.946643999</td>
        </tr>

        <tr>
          <td>Top Gas Used</td>
          <td>Gas Used</td>
        </tr>
        <tr>
          <td className="green">Optimism: Sequencer</td>
          <td>147,096.946643999</td>
        </tr>

        <tr>
          <td>Top Gas Used</td>
          <td>Gas Used</td>
        </tr>
        <tr>
          <td className="green">Optimism: Sequencer</td>
          <td>147,096.946643999</td>
        </tr>

        <tr>
          <td>Top Gas Used</td>
          <td>Gas Used</td>
        </tr>
        <tr>
          <td className="green">Optimism: Sequencer</td>
          <td>147,096.946643999</td>
        </tr>
      </table>
    );
  };

  const filterDate = () => {
    return (
      <ul className="topstatistics-time">
        <li onClick={() => handleChangeFilterDate(1)} className={paramsStatistics?.day * 1 === 1 ? "item active" : "item"}>24 hours</li>
        <li onClick={() => handleChangeFilterDate(3)} className={paramsStatistics?.day * 1 === 3 ? "item active" : "item"}>3 Days</li>
        <li onClick={() => handleChangeFilterDate(7)} className={paramsStatistics?.day * 1 === 7 ? "item active" : "item"}>7 Days</li>
      </ul>
    );
  }

  return (
    <div className="topstatistics-wrapper">
      <div className="topstatistics-heading">
        <h1>Top Statistics</h1>
      </div>

      <Tabs>
        <TabPane tab="Overview" key="1">
          {filterDate()}
          <div className="topstatistics-content">
            {tableTransactions()}
            {tableTokens()}
            {tableNetwork()}
          </div>
        </TabPane>
        <TabPane tab="Transaction" key="2">
          {filterDate()}
          <div className="topstatistics-content">
            {tableTransactions()}
          </div>
        </TabPane>
        <TabPane tab="Tokens" key="3">
          {filterDate()}
          <div className="topstatistics-content">
            {tableTokens()}
          </div>
        </TabPane>
        <TabPane tab="Network" key="4">
          {filterDate()}
          <div className="topstatistics-content">
            {tableNetwork()}
          </div>
        </TabPane>
      </Tabs>
    </div >
  )
}

export default TopStatistics
