import React from 'react'
import { useRouter } from 'next/router'
import { Dropdown, Input } from 'antd'
import styled from 'styled-components'
import PublicLayoutBlock from 'layouts/PublicLayoutBlock'
import CardTabs from 'components/Card/CardTabs'
import Transfers from './components/Transfers'
import Holders from './components/Holders'
import Contract from './components/Contract'
import Comments from './components/Comments'
import TokenHeader from './components/HeaderPage'
import CardSection from './components/CardSection'
import DexTrades from './components/DexTrades'
import HrGray from 'components/LineBorder'
import useAddressDetail from 'hooks/useAddressDetail'
import useFetchStatistics from 'redux/statistics/hooks/useFetchStatistics'
import { useFetchTxsErc20WithCA } from 'redux/token/hooks/useFetchTxsErc20'
import { useAds } from 'redux/statistics/hooks'
import { useSettings } from 'redux/settings/hooks'
import Events from './components/Events'
import CardFilterTokenAddressBalance from 'components/Token/CardFilterTokenAddressBalance'
import useAllErc20Balances from 'redux/token/hooks/useAllErc20Balances'

const WrapCardRightSearch = styled.div`
    font-size: 0.7rem;
    max-width: 550px;
    padding: 12px;
    background: #fff;
    box-shadow: 0 2px 7px rgb(52 152 219 / 5%), 0 0 10px hsl(210deg 8% 46% / 10%);
    border-radius: 6px;

    input,
    button {
        transition: 0s;
        &:hover,
        &:focus {
            border: 1px solid var(--border-color) !important;
            border-color: var(--border-color) !important;
            outline: unset;
            box-shadow: unset;
        }
    }
`
const TabContractTitle = styled.div`
    img {
        width: 10px;
        height: 10px;
        margin-top: -6px;
        margin-left: 4px;
    }
`

export const TABS_VIEW = {
    Transfers: 'Transfers',
    Holders: 'Holders',
    Info: 'Info',
    DexTrade: 'contract',
    Events: 'Events',
    Contract: 'Contract',
    Comments: 'Comments',
}

const TokenPage = () => {
    const router = useRouter()
    const { token, a: address } = router.query

    const settings = useSettings()
    const { adsText, adsBanner } = useAds()

    const { statistics } = useFetchStatistics()
    const { addressDetail } = useAddressDetail(token)
    const { balancesErc20 } = useAllErc20Balances(address, 1, 50)
    const { txsErc20, paramsTxsErc20, setParamsTxsErc20 } = useFetchTxsErc20WithCA(token)

    // console.log('statistics', statistics)
    // console.log('addressDetail', addressDetail)
    // console.log('txsErc20', txsErc20)
    // console.log('balancesErc20', balancesErc20)

    const tokenBalance = balancesErc20?.data?.find((token) => token.a.a === address)

    const menuSubHeader = settings?.menu_sub_header

    return (
        <div className="token-wrapper">
            <TokenHeader addressDetail={addressDetail?.data} menuSubHeader={menuSubHeader} />

            <HrGray className="container" />

            <div className="container widget">
                {adsText && (
                    <a href={adsText?.url} target="_blank" rel="noreferrer">
                        {adsText?.text || ''}
                    </a>
                )}
                {/* Featured: <span>Build Precise & Reliable Apps with Etherscan APIs. </span> */}
                {/* <span>Learn More!</span> */}
            </div>

            <div className="container token-main">
                <div className="main-top">
                    <CardSection
                        address={token}
                        addressDetail={addressDetail?.data}
                        statistics={statistics}
                        totalTransfer={txsErc20?.total}
                    />
                </div>

                <div className="container ads-img">
                    {adsBanner && (
                        <a url={adsBanner.url} target="_blank">
                            <img src={adsBanner.image} alt="" />
                        </a>
                    )}
                    {/* <img src="/images/address/ad-img.png" alt="" /> */}
                </div>

                {address && (
                    <CardFilterTokenAddressBalance
                        address={address}
                        token={token}
                        addressDetail={addressDetail?.data}
                        tokenBalance={tokenBalance}
                    />
                )}

                <div className="token-main-under">
                    <CardTabs
                        // activeKey="5"
                        tabBarExtraContent={
                            <Dropdown
                                trigger={['click']}
                                overlay={
                                    <WrapCardRightSearch>
                                        <Input.Search size="large" placeholder="input search text" />
                                    </WrapCardRightSearch>
                                }
                            >
                                <div className="card_tabs_right_search_icon">
                                    <img src="/images/icon/search_icon.png" alt="" />
                                </div>
                            </Dropdown>
                        }
                        tabs={[
                            {
                                key: TABS_VIEW.Transfers,
                                title: 'Transfers',
                                content: (
                                    <Transfers
                                        token={token}
                                        txsErc20={txsErc20}
                                        paramsTxsErc20={paramsTxsErc20}
                                        setParamsTxsErc20={setParamsTxsErc20}
                                    />
                                ),
                            },
                            {
                                key: TABS_VIEW.Holders,
                                title: 'Holders',
                                content: <Holders addressDetail={addressDetail?.data} />,
                            },
                            // {
                            //   key: TABS_VIEW.Info,
                            //   title: 'Info',
                            //   content: <Info />,
                            // },
                            {
                                key: TABS_VIEW.DexTrade,
                                title: 'DEX Trades',
                                content: <DexTrades />,
                            },
                            {
                                key: TABS_VIEW.Contract,
                                title: (
                                    <TabContractTitle>
                                        Contract
                                        {addressDetail?.data?.ab && <img src="/images/icon/check.svg" alt="" />}
                                    </TabContractTitle>
                                ),
                                content: <Contract token={token} addressDetail={addressDetail?.data} />,
                            },
                            {
                                key: TABS_VIEW.Events,
                                title: 'Events',
                                content: <Events />,
                            },
                            {
                                key: TABS_VIEW.Comments,
                                title: 'Comments',
                                content: <Comments />,
                            },
                        ]}
                    />
                </div>
            </div>
        </div>
    )
}

TokenPage.Layout = PublicLayoutBlock
export default TokenPage
