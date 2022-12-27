import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { Button, Layout } from 'antd'
import { tabAccount, TAB_ACCOUNT_LINK } from './accountConfig'
import useAuth from 'hooks/useAuth'
import PublicLayoutBlock from 'layouts/PublicLayoutBlock'
import AccountOverview from './components/AccountOverview'
import AccountSetting from './components/AccountSetting'
import PulsescanConnect from './components/PulsescanConnect'
import WatchList from './components/WatchList'
import PrivateNameTags from './components/AddressPrivateTags'
import TnxPrivateNotes from './components/TnxPrivateNotes'
import APIkey from './components/Api'
import VerifiedAddresses from './components/VerifiedAddresses'
import CustomABIst from './components/ConnectCustomABI'
import TokenIgnoreList from './components/TokenIgnorelist'
import Sidebar from './components/Sidebar'

const Overview = () => {
  const router = useRouter()
  const { userInfo } = useSelector((state) => state.User)

  const { logout } = useAuth()
  const tabList = tabAccount()

  const tabPathActive = router.asPath.split('#')[1]
  const [activeTab, setActiveTab] = useState(tabPathActive ? `#${tabPathActive}` : tabList[0].items[0].href)
  const [breakCum, setBreakcum] = useState('Account Overview')

  const onChangeTab = (value) => {
    setActiveTab(value)
    router.push(value)
    switch (value) {
      case '#overview': {
        setBreakcum('Account Overview')
        break
      }
      case '#settings': {
        setBreakcum('Account settings')
        break
      }

      default:
        return null
    }
  }

  return (
    <div className="overview-page container">
      <div className="overview-page_header">
        <div className="overview-page_header_top">
          <h1>Account Overview</h1>
          <Button className="btn btn-sign_out" onClick={logout}>
            <img src="/images/account/signout.png" alt="" />
            <span>Sign Out</span>
          </Button>
        </div>

        <div className="overview-page_header_bottom">
          <div className="breakcum-left">
            <div className="">Home</div>
            <div className="breakcum-arrow">/</div>
            <a href="#" style={{ color: '#418143' }}>
              {/* Account Overview */}
              {breakCum}
            </a>
          </div>
        </div>
      </div>

      <div className="overview-page_content">
        <Sidebar tabList={tabList} activeTab={activeTab} onChangeTab={onChangeTab} />

        <Layout className="overview-page_content_right">
          {(() => {
            switch (activeTab) {
              case TAB_ACCOUNT_LINK.overview: {
                return <AccountOverview userInfo={userInfo} onChangeTab={onChangeTab} />
              }
              case TAB_ACCOUNT_LINK.settings: {
                return <AccountSetting userInfo={userInfo} onChangeTab={onChangeTab} />
              }
              case TAB_ACCOUNT_LINK.pulsescan: {
                return <PulsescanConnect userInfo={userInfo} onChangeTab={onChangeTab} />
              }
              case TAB_ACCOUNT_LINK.watchlist: {
                return <WatchList />
              }
              case TAB_ACCOUNT_LINK.privatenametags: {
                return <PrivateNameTags />
              }
              case TAB_ACCOUNT_LINK.privatenotes: {
                return <TnxPrivateNotes />
              }
              case TAB_ACCOUNT_LINK.apikey: {
                return <APIkey />
              }
              case TAB_ACCOUNT_LINK.verifiedaddresses: {
                return <VerifiedAddresses />
              }
              case TAB_ACCOUNT_LINK.customabist: {
                return <CustomABIst />
              }
              case TAB_ACCOUNT_LINK.tokenignore: {
                return <TokenIgnoreList />
              }

              default:
                return null
            }
          })()}
        </Layout>
      </div>
    </div>
  )
}

Overview.Layout = PublicLayoutBlock
export default Overview
