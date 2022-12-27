import React from 'react'
import { Button } from 'antd'
import styled from 'styled-components'
import CardOverview from '../CardOverview'

const ApiTitle = styled.div`
  margin-top: 24px;
  margin-left: 24px;
  margin-right: 24px;
  font-size: 16px;
`
const ApiKeys = () => {
  return (
    <>
      <CardOverview
        className="api_keys"
        title={'Current API Plans'}
        rightNode={
          <div className="api_keys_title">
            <Button className="btn_add">
              <img src="/images/account/add.png" />
              Add
            </Button>
          </div>
        }
      >
        <ApiTitle>
          <p>
            For developers interested in building applications using our API Service, please create an API-Key Token
            which you can then use with all your API requests.
          </p>
        </ApiTitle>
        <div className="overview_info_content api_keys_content">
          <div className="api_keys_content_top">
            <div className="api_keys_content_top_username ">
              <span style={{ fontSize: '14px', fontWeight: 400 }}>0 key added (out of 3 max limit)</span>
              <div>
                <img src="/images/account/search.png" />
              </div>
            </div>
            <div className="api_keys_content_top_username">
              <p>App Name</p>
              <p>API Key Token</p>
              <p>API Statistics</p>
              <p></p>
            </div>
            <div className="api_keys_content_top_username">
              <p className="center">
                <img src="/images/account/matching.png" /> You have yet to create an API-Key Token.
              </p>
            </div>
          </div>

          <div className="api_keys_content_bottom">
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

export default ApiKeys
