import React from 'react'
import PersonalInfo from '../PersonalInfo'
import OverviewUsage from '../OverviewUsage'

const AccountOverview = ({ userInfo, onChangeTab }) => {
  return (
    <>
      <PersonalInfo userInfo={userInfo} onChangeTab={onChangeTab} />
      {/* <OverviewUsage userInfo={userInfo} onChangeTab={onChangeTab} /> */}
    </>
  )
}

export default AccountOverview
