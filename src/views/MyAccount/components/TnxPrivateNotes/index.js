import React from 'react'
import { Button } from 'antd'
import styled from 'styled-components'
import CardOverview from '../CardOverview'

const TnxNotesTitle = styled.div`
  margin-top: 24px;
  margin-left: 24px;
  margin-right: 24px;
  font-size: 16px;
`
const TnxPrivateNotes = () => {
  return (
    <>
      <CardOverview
        className="tnx_notes"
        title={'Transaction Private Notes'}
        rightNode={
          <div className="tnx_notes_title">
            <Button className="btn_add">
              <img src="/images/account/add.png" />
              Add
            </Button>
          </div>
        }
      >
        <TnxNotesTitle>
          <p>A private transaction note (up to 100 characters) can be saved and is useful for transaction tracking.</p>
        </TnxNotesTitle>
        <div className="overview_info_content tnx_notes_content">
          <div className="tnx_notes_content_top">
            <div className="tnx_notes_content_top_username ">
              <span style={{ fontSize: '14px', fontWeight: 400 }}> 0 notes added (out of 2000 max limit)</span>
              <div>
                <img src="/images/account/search.png" />
              </div>
            </div>
            <div className="tnx_notes_content_top_username">
              <p>Transaction</p>
            </div>
            <div className="tnx_notes_content_top_username">
              <p className="center">
                <img src="/images/account/matching.png" /> There are no private tags found
              </p>
            </div>
          </div>

          <div className="tnx_notes_content_bottom">
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

export default TnxPrivateNotes
