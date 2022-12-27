import React from 'react'
import DeleteAccount from '../DeleteAccount'
import Password from '../Password'
import UserSetting from '../UserSetting'

const AccountOverview = (props) => {
  return (
    <>
      {/* <UserSetting {...props} /> */}
      <Password {...props} />
      {/* <DeleteAccount {...props} /> */}
    </>
  )
}

export default AccountOverview
