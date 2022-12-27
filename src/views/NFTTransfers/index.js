import React from 'react'
import PublicLayoutBlock from 'layouts/PublicLayoutBlock'

import Pagination from 'components/Pagination'
import BlockTransfers from './components/BlockTransfers'

const NFTTransfers = () => {
  return (
    <div className="nft-transfers-page">
      <div className="head">
        <div className="left">
          Non-Fungible Token Transfers
          <span>PN - 20</span>
        </div>
      </div>

      <div className="content">
        <div className="top">
          <h1>PulseDex presale details to be announced soon</h1>
        </div>
        <div className="middle">
          <div className="description">
            <h2>A total of &gt; 10 M txns found</h2>
            <p>(Showing the last 10,000 records only)</p>
          </div>
          <Pagination />
        </div>

        <div className="horizontal-scroll">
          <table className="table">
            <tr>
              <th>Txn Hash</th>
              <th>Age</th>
              <th>From</th>
              <th>To</th>
              <th>TokenID</th>
              <th>Token</th>
              <th>Details</th>
            </tr>
            <BlockTransfers />
            <BlockTransfers />
            <BlockTransfers />
            <BlockTransfers />
            <BlockTransfers />
            <BlockTransfers />
            <BlockTransfers />
            <BlockTransfers />
          </table>
        </div>

        <div className="bottom">
          <div className="left">
            <div className="show">Show</div>
            <div className="numberPage">
              25 <img src="images/icon/iconUpDown.png" className="upDown" />
            </div>
            <div className="records">Records</div>
          </div>

          <div className="right">
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  )
}
NFTTransfers.Layout = PublicLayoutBlock

export default NFTTransfers
