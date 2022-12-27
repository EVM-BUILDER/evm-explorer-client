import React from 'react'
import { Button } from 'antd'
import styled from 'styled-components'
import CardOverview from '../CardOverview'

const NameTagsTitle = styled.div`
  margin-top: 24px;
  margin-left: 24px;
  margin-right: 24px;
  font-size: 16px;
`
const PrivateNameTags = () => {
  return (
    <>
      <CardOverview
        className="name_tags"
        title={'Address Private Name Tags'}
        rightNode={
          <div className="name_tags_title">
            <Button className="btn_add">
              <img src="/images/account/add.png" />
              Add
            </Button>
          </div>
        }
      >
        <NameTagsTitle>
          <p>
            A private name tag (up to 35 chars) and memo (up to 500 chars) for individual addresses can be saved and is
            useful for labelling addresses of interest.
          </p>
        </NameTagsTitle>
        <div className="overview_info_content name_tags_content">
          <div className="name_tags_content_top">
            <div className="name_tags_content_top_username ">
              <span style={{ fontSize: '14px', fontWeight: 400 }}>0 address tagged (out of 1000 max limit)</span>
              <div>
                <img src="/images/account/search.png" />
              </div>
            </div>
            <div className="name_tags_content_top_username">
              <p>
                <img src="/images/account/matching.png" />
                &nbsp;&nbsp;&nbsp; Address
              </p>
              <p>Private Nametag</p>
              <p></p>
              <p></p>
            </div>
            <div className="name_tags_content_top_username">
              <p className="center">
                <img src="/images/account/matching.png" /> There are no private tags found
              </p>
            </div>
          </div>

          <div className="name_tags_content_bottom">
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

export default PrivateNameTags
