import React from 'react'
import { Button } from 'antd'
import styled from 'styled-components'
import CardOverview from '../CardOverview'

const IgnoreListTitle = styled.div`
  margin-top: 24px;
  margin-left: 24px;
  margin-right: 24px;
  font-size: 16px;
`

const IgnoreList = () => {
  return (
    <>
      <CardOverview
        className="ignore_list"
        title={'Token Ignore List'}
        rightNode={
          <div className="ignore_list_title">
            <Button className="btn_add">
              <img src="/images/account/add.png" />
              Add
            </Button>
          </div>
        }
      >
        <IgnoreListTitle>
          <p>
            Hide selected tokens from being displayed in the Address Token Summary, Token Holdings and Watch List pages.
            This is a private setting only applicable to you when logged-in with an Etherscan account.
            <a style={{ color: '#418143' }}>Learn more here.</a>
          </p>
        </IgnoreListTitle>
        <div className="overview_info_content ignore_list_content">
          <div className="ignore_list_content_top">
            <div className="ignore_list_content_top_username ">
              <span style={{ fontSize: '14px', fontWeight: 400 }}> 0 token added (out of 30 max limit)</span>
              <div>
                <img src="/images/account/search.png" />
              </div>
            </div>
            <div className="ignore_list_content_top_username">
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '40%' }}>
                <p>Token Contract Address</p>
                <p>Token </p>
              </div>
            </div>
            <div className="ignore_list_content_top_username">
              <p className="center">
                <img src="/images/account/matching.png" />
                &nbsp; You have yet to create a Token Ignore entry.
              </p>
            </div>
          </div>

          <div className="ignore_list_content_bottom">
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

export default IgnoreList
