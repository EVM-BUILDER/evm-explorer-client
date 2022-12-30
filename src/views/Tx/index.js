import React from 'react'
import { Menu, Dropdown, Button, Space } from 'antd'
import { MoreOutlined } from '@ant-design/icons'
import PublicLayoutBlock from 'layouts/PublicLayoutBlock'
import { Link } from 'components/Link'
import { useSelector } from 'react-redux'
import CardTabs from 'components/Card/CardTabs'
import TxDetailOverview from './components/TxDetailOverview'
import TxDetailConsensusInfo from './components/TxDetailConsensusInfo'
import TxDetailComments from './components/TxDetailComments'
import { useAds } from 'redux/statistics/hooks'

const TransactionModule = () => {
  const { settings } = useSelector((state) => state.Settings)
  const { blocks } = useSelector((state) => state.Blocks)
  const { transactionDetail, loading } = useSelector((state) => state.Transactions)

  // console.log('transactionDetail', transactionDetail)

  const adsText = useAds()

  const menuSubHeader = settings?.menu_sub_header

  return (
    <main className="transaction-content">
      <div className="container transaction-heading">
        <div className="heading-left">
          <h1>Transaction Details</h1>
          {/* <div className="heading-pagination">
            <Link href={`/block/${+blockDetail?.bn - 1}`} className="item-leftRight">
              <img src="/images/icon/arrow-square-left.svg" alt="" />
            </Link>
            <Link href={`/block/${+blockDetail?.bn + 1}`} className="item-leftRight">
              <img src="/images/icon/arrow-square-right.svg" alt="" />
            </Link>
          </div> */}
        </div>

        <div>
          <Space wrap>
            {menuSubHeader?.map((menu) => (
              <Link key={menu.title} href={menu.url} {...(menu?.target && { target: menu.target })}>
                <Button>{menu.title}</Button>
              </Link>
            ))}
          </Space>
          {/* <Space wrap>
            <Dropdown overlay={Buy} trigger={['click']} className="active">
              <Button>Buy</Button>
            </Dropdown>
            <Dropdown overlay={Exchange} trigger={['click']} className="active">
              <Button>Exchange</Button>
            </Dropdown>
            <Dropdown overlay={Earn} trigger={['click']}>
              <Button>Earn</Button>
            </Dropdown>
            <Dropdown overlay={Gaming} trigger={['click']}>
              <Button>Gaming</Button>
            </Dropdown>
          </Space> */}
        </div>
      </div>
      <div className="container hr-alt-01">
        <div />
      </div>
      <div className="container transaction-space">
        {adsText && (
          <b>
            {adsText.text}{' '}
            {adsText.url && (
              <Link href={adsText.url} target="_blank" rel="noreferrer">
                View now !
              </Link>
            )}
          </b>
        )}
      </div>
      <div className="container transaction-bottom">
        <div className="transaction-space-card">
          <CardTabs
            // activeKey="5"
            tabBarExtraContent={
              <Dropdown
                trigger={['click']}
                menu={
                  <Menu>
                    <Menu.Item key="1">Remix Debugger</Menu.Item>
                    <Menu.Divider />
                    <Menu.Item key="2">Geth Debug Trace</Menu.Item>
                    <Menu.Item key="3">Geth Debug Trace_2</Menu.Item>
                  </Menu>
                }
              >
                <div className="btn-more-transaction">
                  <Button>
                    <MoreOutlined />
                  </Button>
                </div>
              </Dropdown>
            }
            tabs={[
              {
                key: 'Overview',
                title: 'Overview',
                content: <TxDetailOverview loading={loading} transactionDetail={transactionDetail} blocks={blocks} />,
              },
              {
                key: 'ConsensusInfo',
                title: 'Consensus Info',
                // tabProps: {
                //   tabBarExtraContent: operations,
                // },
                content: <TxDetailConsensusInfo />,
              },
              {
                key: 'Comments',
                title: 'Comments',

                content: <TxDetailComments />,
              },
            ]}
          />
        </div>
        <div className="txn-desc">
          <img src="/images/icon/lamp-hub.png" alt="" />
          <span>
            A wallet address is a publicly available address that allows its owner to receive funds from another party. To access
            the funds in an address, you must have its private key. Learn more about addresses in our{' '}
            <Link href="/knowledgw-base">Knowledge Base.</Link>
          </span>
        </div>

        <div className="txn-banner-bottom">
          <img src="/images/banner/banner.png" alt="" />
        </div>
      </div>
    </main>
  )
}

TransactionModule.Layout = PublicLayoutBlock
export default TransactionModule
