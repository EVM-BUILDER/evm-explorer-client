import React from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { Row, Col } from 'antd'
import styled from 'styled-components'
import PublicLayoutBlock from 'layouts/PublicLayoutBlock'
import { ADDRESS_TYPE } from 'redux/constants'
import { Link } from 'components/Link'
import AddressOverview from 'components/Address/AddressOverview'
import CardTabs from 'components/Card/CardTabs'
import Transactions from './components/Transactions'
import InternalTransactions from './components/TransactionsInternal'
import Analytics from './components/Analytics'
import Comments from './components/Comments'
import TransactionsErc20Token from './components/TransactionsErc20Token'
import { BulbLightIcon } from 'widgets/Svg'
import HeaderAddress from './components/HeaderAddress'
import Events from './components/Events'
import Contract from './components/Contract'
import LineBorder from 'components/LineBorder'
import AddressInfo from 'components/Address/AddressInfo'
import useAddressDetail from 'hooks/useAddressDetail'
import useFetchStatistics from 'redux/statistics/hooks/useFetchStatistics'
import useAllErc20Balances from 'redux/token/hooks/useAllErc20Balances'
import useAllErc721Balances from 'redux/token/hooks/useAllErc721Balances'
import { useAds } from 'redux/statistics/hooks'
import PN_20 from 'config/abis/erc20.json'
import { useSettings } from 'redux/settings/hooks'

const TabContractTitle = styled.div`
    img {
        width: 10px;
        height: 10px;
        margin-top: -6px;
        margin-left: 4px;
    }
`

export const TABS_VIEW = {
    TX: '',
    TX_INTERNAL: 'txInternal',
    TX_ERC20: 'txPn20',
    TX_ER721: 'txPn721',
    CONTRACT: 'contract',
    // EVENTS: 'EVENTS',
    ANALYTICS: 'ANALYTICS',
    COMMENTS: 'COMMENTS',
}

const AddressPage = () => {
    const router = useRouter()
    const { address } = router.query

    const { userInfo } = useSelector((state) => state.User)

    const settings = useSettings()
    const { adsText, adsBanner } = useAds()

    const { statistics } = useFetchStatistics()
    const { addressDetail } = useAddressDetail(address)
    const { balancesErc20 } = useAllErc20Balances(address, 1, 50)
    const { balancesErc721 } = useAllErc721Balances(address, 1, 50)

    // console.log('statistics', statistics)
    // console.log('addressDetail', addressDetail)
    // console.log('balancesErc20', balancesErc20)

    const addressType = addressDetail?.data?.ty
    const chain = settings?.chain
    const nativeToken = settings?.chain?.native
    const menuSubHeader = settings?.menu_sub_header

    return (
        <main className="address_container">
            <HeaderAddress address={address} addressType={addressType} menuSubHeader={menuSubHeader} />
            <LineBorder className="container" />

            <div className="container address-detail-space">
                {adsText && (
                    <Link href={adsText.url} target="_blank" rel="noreferrer">
                        <b className="transaction-space-text">{adsText.text || ''}</b>
                        Explore More.
                    </Link>
                )}
            </div>

            <div className="container">
                <div className="main-top">
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={24} md={12}>
                            <AddressOverview
                                address={address}
                                addressType={addressType}
                                nativeToken={nativeToken}
                                addressDetail={addressDetail}
                                statistics={statistics}
                                balancesErc20={balancesErc20}
                                balancesErc721={balancesErc721}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={12}>
                            <AddressInfo userInfo={userInfo} addressDetail={addressDetail?.data} addressType={addressType} />
                        </Col>
                    </Row>
                </div>
                <div className="main-center">
                    <div className="ads-img">
                        {/* <img src="/images/address/ad-img.png" alt="" /> */}
                        {adsBanner && (
                            <a url={adsBanner.url} target="_blank">
                                <img src={adsBanner.image} alt="" />
                            </a>
                        )}
                    </div>
                </div>
                <div className="main-table">
                    {addressType && (
                        <CardTabs
                            // {...(tabPathActive && { activeKey: TABS_VIEW.CONTRACT })}
                            tabs={[
                                {
                                    key: TABS_VIEW.TX,
                                    title: 'Transactions',
                                    content: <Transactions address={address} />,
                                },
                                addressType !== ADDRESS_TYPE.address && {
                                    key: TABS_VIEW.TX_INTERNAL,
                                    title: 'Internal Txns',
                                    content: <InternalTransactions address={address} />,
                                },
                                {
                                    key: TABS_VIEW.TX_ERC20,
                                    title: `${chain?.erc20 || ''} Token Txns`,
                                    content: <TransactionsErc20Token address={address} />,
                                },
                                // addressType === ADDRESS_TYPE.tokenErc20 && {
                                //   key: TABS_VIEW.TX_ERC721,
                                //   title: `${chain?.erc721 || ''} Token Txns`,
                                //   content: <TransactionsErc20Token address={address} />,
                                // },
                                addressType !== ADDRESS_TYPE.address && {
                                    key: TABS_VIEW.CONTRACT,
                                    title: (
                                        <TabContractTitle>
                                            Contract
                                            {addressDetail?.data?.ab && <img src="/images/icon/check.svg" alt="" />}
                                        </TabContractTitle>
                                    ),
                                    content: <Contract address={address} addressDetail={addressDetail?.data} />,
                                },
                                // {
                                //   key: TABS_VIEW.EVENTS,
                                //   title: 'Events',
                                //   content: <Events />,
                                // },
                                {
                                    key: TABS_VIEW.ANALYTICS,
                                    title: 'Analytics',
                                    content: <Analytics />,
                                },
                                {
                                    key: TABS_VIEW.COMMENTS,
                                    title: 'Comments',
                                    content: <Comments />,
                                },
                            ].filter((o) => o)}
                        />
                    )}
                </div>
                <div className="main-footer">
                    <BulbLightIcon />
                    <p>
                        A wallet address is a publicly available address that allows its owner to receive funds from another
                        party. To access the funds in an address, you must have its private key. Learn more about addresses in our
                        Knowledge Base.
                    </p>
                </div>
            </div>
        </main>
    )
}

AddressPage.Layout = PublicLayoutBlock
export default AddressPage
