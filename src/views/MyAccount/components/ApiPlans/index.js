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
        className="api_plans"
        title={'Current API Plans'}
        rightNode={
          <div className="api_plans_title">
            <Button className="btn_add">
              <img src="/images/account/add.png" />
              Add
            </Button>
          </div>
        }
      >
        <ApiTitle>
          <p>All API plan accounts are FREE by default. You may upgrade your plan to API Pro at any time.</p>
        </ApiTitle>
        <div className="overview_info_content api_plans_content">
          <div className="api_plans_content_top">
            <div className="api_plans_content_top_username">
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '50%' }}>
                <p style={{ fontWeight: 400 }}>My API Plan:</p>
                <p>FREE API PLAN</p>
              </div>
              <Button className="btn_upgrade">
                Upgrade Plan &nbsp;
                <img src="/images/account/arrow.png" />
              </Button>
            </div>
            <div className="api_plans_content_top_username">
              <div className="span_item">
                <span>API calls per second:</span>
                <span style={{ fontWeight: 700 }}>5 calls</span>
              </div>
            </div>
          </div>
        </div>
      </CardOverview>
    </>
  )
}

export default ApiKeys
