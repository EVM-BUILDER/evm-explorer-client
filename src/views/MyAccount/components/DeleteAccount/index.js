import React from 'react'
import { Button, Row, Col, Checkbox } from 'antd'
import styled from 'styled-components'
import CardOverview from '../CardOverview'

const DeleteTitle = styled.div`
  margin-top: 24px;
  margin-left: 24px;
  margin-right: 24px;
  font-size: 16px;
`
const DeleteAccount = () => {
  return (
    <>
      <CardOverview className="del_account" title={'Delete Account'}>
        <DeleteTitle style={{ fontWeight: '700' }}>
          Are you sure you want to permanently delete your user account ?
        </DeleteTitle>
        <DeleteTitle>
          Deleting your user account will also delete all the watchlists, transaction notes, private tags and verified
          addresses ownership. Recovery of the above is not possible upon delete confirmation.
        </DeleteTitle>
        <div className="overview_info_content del_account_content">
          <Row className="del_account_content_bottom">
            <Col xl={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 24 }}>
              <Checkbox />
              &emsp;<span>Confirm that I want to delete my account.</span>
            </Col>
            <Col>
              <Button className="btn_del">Delete Account</Button>
            </Col>
          </Row>
        </div>
      </CardOverview>
    </>
  )
}

export default DeleteAccount
