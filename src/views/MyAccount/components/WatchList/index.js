import React from 'react'
import { Button } from 'antd'
import styled from 'styled-components'
import CardOverview from '../CardOverview'

const WatchListTitle = styled.div`
  margin-top: 24px;
  margin-left: 24px;
  margin-right: 24px;
  font-size: 16px;
`
const WatchList = () => {
  return (
    <>
      <CardOverview
        className="watch_list"
        title={'Watch List'}
        rightNode={
          <div className="watch_list_title">
            <Button className="btn_add">
              <img src="/images/account/add.png" />
              Add
            </Button>
          </div>
        }
      >
        <WatchListTitle>
          <p>
            An Email notification can be sent to you when an address on your watch list sends or receives any
            transactions.
          </p>
        </WatchListTitle>
        <div className="overview_info_content watch_list_content">
          <div className="watch_list_content_top">
            <div className="watch_list_content_top_username ">
              <span style={{ fontSize: '14px', fontWeight: 400 }}> 0 address selected (out of 50 max limit)</span>
              <div>
                <img src="/images/account/search.png" />
              </div>
            </div>
            <div className="watch_list_content_top_username">
              <p>Address</p>
              <p>Private Nametag</p>
              <p>Notificationz</p>
              <p></p>
            </div>
            <div className="watch_list_content_top_username">
              <p className="center">
                <img src="/images/account/matching.png" /> There are no matching entries
              </p>
            </div>
          </div>

          <div className="watch_list_content_bottom">
            <div className="flex-end">
              <a href="#">First</a>
              <a href="#">&lt;</a>
              <span>Page 1 of 632679</span>
              <a href="#">&gt;</a>
              <a href="#">Last</a>
            </div>
          </div>
        </div>
      </CardOverview>
    </>
  )
}

export default WatchList
