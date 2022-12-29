import React, { useMemo } from 'react'
import CardBase from 'components/Card/CardBase'
import { Link } from 'components/Link'
import { Col, Row } from 'antd'
import FormatAmount from 'components/FormatAmount/index.jsx'
import { formatBigNumber } from 'library/helpers/Number.js'
import { useSettings } from 'redux/settings/hooks'

const tokenPrice = 0

const TokenOverview = ({ addressDetail, statistics, totalTransfer }) => {
  const statisticsFirstItem = statistics?.[0]
  const statisticSecondItem = statistics?.[1]

  const { chain } = useSettings()

  const withNativePriceUsd = useMemo(() => {
    let newPrice
    let oldPrice
    let perChange
    let isUp
    if (statisticsFirstItem) {
      newPrice = (tokenPrice / statisticsFirstItem?.tp?.cur)?.toFixed(2)
    }
    if (statisticSecondItem) {
      oldPrice = (tokenPrice / statisticSecondItem?.tp?.cur)?.toFixed(2)
    }
    if (newPrice && oldPrice) {
      perChange = ((newPrice / oldPrice) * 100)?.toFixed(2)
      isUp = newPrice > oldPrice
    }
    return {
      newPrice,
      oldPrice,
      perChange,
      isUp,
    }
  }, [statisticSecondItem, statisticsFirstItem])

  return (
    <div className="card_token_overview">
      <CardBase
        title={
          <>
            Overview{` `}
            <span className="card_token_overview_title_small">[PN-20]</span>
          </>
        }
        content={
          <>
            <Row className="card_token_overview_item">
              <Col xs={12} md={10}>
                <Row style={{ flex: 1 }} align="middle" gutter={[{ xs: 4 }, { xs: 4 }]}>
                  <Col xs={24} xl={24} className="text-small">
                    PRICE
                  </Col>
                  <Col xs={24} xl={24} className="content-subtitle">
                    <span>--</span>
                    {/* <span>${tokenPrice ? tokenPrice.toFixed(2) : '--'}</span>
                    <span>{withNativePriceUsd.newPrice ? ` @ ${withNativePriceUsd.newPrice} ${chain.native.symbol} ` : ''}</span>
                    {withNativePriceUsd.perChange && <span>({withNativePriceUsd.perChange}%)</span>} */}
                  </Col>
                </Row>
              </Col>
              {/* 
              <Col xs={12} md={14} className="content-desc">
                <Row style={{ flex: 1 }} align="middle" gutter={[{ xs: 4 }, { xs: 4 }]}>
                  <Col xs={24} xl={14} className="text-small">
                    MARKET CAP
                  </Col>
                  <Col xs={24} xl={10} className="volume">
                    --
                  </Col>
                </Row>
              </Col> */}
            </Row>

            <Row className="card_token_overview_item" gutter={[{ xs: 4 }, { xs: 4 }]}>
              <Col xs={24} md={10}>
                Total Supply:
              </Col>

              <Col xs={24} md={14}>
                <FormatAmount value={addressDetail?.pro?.tsu} nullValue="0" suffix={` ${addressDetail?.pro?.sym || ''}`} />
              </Col>
            </Row>

            <Row className="card_token_overview_item" gutter={[{ xs: 4 }, { xs: 4 }]}>
              <Col xs={24} md={10}>
                Holders:
              </Col>

              <Col xs={24} md={14}>
                <Row>
                  <Col xs={10}>
                    <FormatAmount value={addressDetail?.pro?.tho} nullValue="0" />
                  </Col>
                  <Col xs={10}>{/* <Chart /> */}</Col>
                </Row>
              </Col>
            </Row>

            <Row className="card_token_overview_item" gutter={[{ xs: 4 }, { xs: 4 }]}>
              <Col xs={24} md={10}>
                Transfers:
              </Col>

              <Col xs={24} md={14}>
                <FormatAmount value={totalTransfer || 0} nullValue="0" />
              </Col>
            </Row>
          </>
        }
        rightNode={
          <Link href="#" className="right-node-overview">
            Chart
          </Link>
        }
        backgroundHeader="#EEEEEE"
      />
    </div>
  )
}

export default TokenOverview
