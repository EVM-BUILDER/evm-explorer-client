import React, { useEffect, useState } from 'react'
import PublicLayoutBlock from 'layouts/PublicLayoutBlock'

import BlockTracker from './components/BlockTracker'
import Pagination from 'components/Pagination'

import { FAKE_DATA } from 'views/NFTTracker/fakeData'
import { useRouter } from 'next/router'

const NFTTracker = () => {
  const [limit, setLimit] = useState(10)

  const router = useRouter()
  const { query, pathname } = router

  const pageLength = FAKE_DATA.length

  const handlePerPage = (limitNumber) => {
    router.replace(`?page=${1}&limit=${limitNumber}`)
    setLimit(limitNumber)
    console.log(limitNumber)
  }

  return (
    <div className="nft-tracker-page">
      <div className="head">
        <div className="left">
          Non-Fungible Token Tracker
          <span>PN - 20</span>
        </div>
      </div>

      <div className="content">
        <div className="top">
          <h1>Non-Fungible Tokens (NFT)</h1>
          <div className="icon">
            <img src="/images/icon/search.png" className="search" />
          </div>
        </div>
        <div className="middle">
          <div className="description">
            <h2>A total of 159,264 PN-721 Token Contracts found</h2>
            <p>(Showing the last 100k records)</p>
          </div>
          <Pagination page={pageLength} />
        </div>

        <div className="content-table">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Token</th>
                <th>
                  <div>
                    <img src="/images/icon/arrow-square-down.png" className="down" />
                    Transfers (24H)
                  </div>
                </th>
                <th>Transfers (3D)</th>
              </tr>
            </thead>
            <tbody>
              {FAKE_DATA &&
                FAKE_DATA.map((data, index) => {
                  return <BlockTracker key={index} data={data} />
                })}
            </tbody>
          </table>
        </div>

        <div className="bottom">
          <div className="left">
            <div className="show">Show</div>

            <div className="numberPage" value={limit} onChange={(e) => handlePerPage(e.target.value)}>
              <select>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
              </select>
            </div>

            <div className="records">Records</div>
          </div>

          <div className="right">
            <Pagination page={pageLength} limit={limit} />
          </div>
        </div>
      </div>
    </div>
  )
}
NFTTracker.Layout = PublicLayoutBlock

export default NFTTracker
