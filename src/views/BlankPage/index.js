import React from 'react'
import CardBase from 'components/Card/CardBase'
import PublicLayout from 'layouts/PublicLayout'

const BlankPage = () => {
  return (
    <div style={{ padding: '48px' }}>
      <CardBase
        title="Personal Info"
        backgroundHeader="#EEEEEE"
        content={
          <div className="personal_info">
            <p>Below are the username, email and overview information for your account.</p>
            <p>Below are the username, email and overview information for your account.</p>
            <p>Below are the username, email and overview information for your account.</p>
            <p>Below are the username, email and overview information for your account.</p>
            <p>Below are the username, email and overview information for your account.</p>
            <p>Below are the username, email and overview information for your account.</p>
            <p>Below are the username, email and overview information for your account.</p>
            <p>Below are the username, email and overview information for your account.</p>
            <p>Below are the username, email and overview information for your account.</p>
            <p>Below are the username, email and overview information for your account.</p>
            <p>Below are the username, email and overview information for your account.</p>
          </div>
        }
      />
    </div>
  )
}

BlankPage.Layout = PublicLayout

export default BlankPage
