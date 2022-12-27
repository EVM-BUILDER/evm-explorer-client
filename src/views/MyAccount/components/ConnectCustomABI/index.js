import React from 'react'
import { Button } from 'antd'
import styled from 'styled-components'
import CardOverview from '../CardOverview'

const AbiTitle = styled.div`
  margin-top: 24px;
  margin-left: 24px;
  margin-right: 24px;
  font-size: 16px;
`
const CustomABI = () => {
  return (
    <>
      <CardOverview
        className="custom_abi"
        title={'Contract Custom ABI'}
        rightNode={
          <div className="custom_abi_title">
            <Button className="btn_add">
              <img src="/images/account/add.png" />
              Add
            </Button>
          </div>
        }
      >
        <AbiTitle>
          <p>
            You can add custom ABI for an unverified smart contract to interact with it once logged-in to your PULSESCAN
            account.
          </p>
        </AbiTitle>
        <div className="overview_info_content custom_abi_content">
          <div className="custom_abi_content_top">
            <div className="custom_abi_content_top_username ">
              <span style={{ fontSize: '14px', fontWeight: 400 }}> 0 ABI added (out of 10 max limit)</span>
              <div>
                <img src="/images/account/search.png" />
              </div>
            </div>
            <div className="custom_abi_content_top_username">
              <div style={{ display: 'flex', width: '50%', justifyContent: 'space-between', marginLeft: '16px' }}>
                <span>Contract Address</span>
                <span>Title</span>
              </div>
            </div>
            <div className="custom_abi_content_top_username">
              <p className="center">
                <img src="/images/account/matching.png" /> There are no matching entries
              </p>
            </div>
          </div>

          <div className="custom_abi_content_bottom">
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

export default CustomABI
