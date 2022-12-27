import React from 'react'
import { Button } from 'antd'
import styled from 'styled-components'
import CardOverview from '../CardOverview'

const VerifiedTitle = styled.div`
  margin-top: 24px;
  margin-left: 24px;
  margin-right: 24px;
  font-size: 16px;
`
const VerifiedAddresses = () => {
  return (
    <>
      <CardOverview
        className="verified_addresses"
        title={'Verified Addresses'}
        // rightNode={
        //   <div className="verified_addresses_title">
        //     <Button className="btn_verified">
        //       Upgrade Plan &ensp;
        //       <img src="/images/account/verified.png" />
        //     </Button>
        //   </div>
        // }
      >
        <VerifiedTitle>
          <p>
            The Verify Address Ownership process involves verifying the ownership of an PULSE address used to create an PULSESCAN
            smart contract. This verification will be linked to an PULSESCAN account. Once a user has claimed ownership of an
            address, the user will be able to update token information and address name tags without needing to sign a new message
            each time. Find out more about verify address ownership.
          </p>
        </VerifiedTitle>
        <div className="overview_info_content verified_addresses_content">
          <div className="verified_addresses_content_top">
            <div className="verified_addresses_content_top_username ">
              <span style={{ fontSize: '14px', fontWeight: 400 }}> 0 address verified (out of 1000 max limit)</span>
              <div>
                <img src="/images/account/search.png" />
              </div>
            </div>
            <div className="verified_addresses_content_top_username">
              <p>Address</p>
              <p>Quick Links</p>
              <p>Verified Date</p>
              <p></p>
            </div>
            <div className="verified_addresses_content_top_username">
              <p className="center">
                <img src="/images/account/matching.png" />
                &nbsp;You have yet to verify any address.
              </p>
            </div>
          </div>

          <div className="verified_addresses_content_bottom">
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

export default VerifiedAddresses
