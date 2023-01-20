import React from 'react'
import CardBase from 'components/Card/CardBase'
import { Link } from 'components/Link'
import { Col, Row } from 'antd'
import { useSettings } from 'redux/settings/hooks'

const contract = {
  officialSite: 'website',
  socials: [
    {
      url: '#',
      icon: '/images/contract/item1.svg',
    },
    {
      url: '#',
      icon: '/images/contract/item2.svg',
    },
    {
      url: '#',
      icon: '/images/contract/item3.svg',
    },
    {
      url: '#',
      icon: '/images/contract/item4.svg',
    },
    {
      url: '#',
      icon: '/images/contract/item5.svg',
    },
    {
      url: '#',
      icon: '/images/contract/item6.svg',
    },
  ],
}

const TokenContract = ({ address, addressDetail }) => {
  const { appearance, chain } = useSettings()

  return (
    <div className="card_token_contract">
      <CardBase
        title="Contract"
        backgroundHeader={appearance?.card?.header_bg_color}
        backgroundBody={appearance?.card?.body_bg_color}
        content={
          <>
            <Row className="card_token_contract_item" gutter={[{ xs: 10 }, { xs: 10 }]}>
              <Col xs={{ span: 24 }} md={{ span: 8 }}>
                Contract:
              </Col>

              <Col xs={{ span: 24 }} md={{ span: 16 }} className="content-desc truncate">
                <Link href={`/address/${addressDetail?.a || address}`}>{addressDetail?.a || address}</Link>
              </Col>
            </Row>

            <Row className="card_token_contract_item" gutter={[{ xs: 10 }, { xs: 10 }]}>
              <Col xs={{ span: 24 }} md={{ span: 8 }}>
                Decimals:
              </Col>

              <Col xs={{ span: 24 }} md={{ span: 16 }}>
                {addressDetail?.pro?.de}
              </Col>
            </Row>

            <Row className="card_token_contract_item" gutter={[{ xs: 10 }, { xs: 10 }]}>
              <Col xs={{ span: 24 }} md={{ span: 8 }}>
                Official Site:
              </Col>

              <Col xs={{ span: 24 }} md={{ span: 16 }} className="content-desc link">
                {addressDetail?.officialSite ? (
                  <a href={addressDetail.officialSite} target="_blank" rel="noreferrer">
                    {addressDetail.officialSite}{' '}
                    <span>
                      <img src="/images/icon/export.svg" alt="export" />
                    </span>
                  </a>
                ) : (
                  <span>
                    Not Available, <Link to={`/myaccount`}>Update?</Link>
                  </span>
                )}
              </Col>
            </Row>

            <Row className="card_token_contract_item" gutter={[{ xs: 10 }, { xs: 10 }]}>
              <Col xs={{ span: 24 }} md={{ span: 8 }}>
                Socials:
              </Col>

              <Col xs={{ span: 24 }} md={{ span: 16 }} className="content-desc socials">
                {addressDetail?.socials ? (
                  contract.socials.map((item) => (
                    <a className="icon" key={item.icon} href={item.url} target="_blank" rel="noreferrer noopener">
                      <img src={item.icon} alt="social" />
                    </a>
                  ))
                ) : (
                  <span>
                    Not Available, <Link to={`/myaccount`}>Update?</Link>
                  </span>
                )}
              </Col>
            </Row>
          </>
        }
        rightNode={
          <div className="right-node-contract">
            {/* <Link href="#">
              <a target="_blank" rel="noreferrer noopener">
                <img src="/images/contract/like.svg" alt="like" />
              </a>
            </Link>
            <Link href="#">
              <a target="_blank" rel="noreferrer noopener">
                <img src="/images/contract/check.svg" alt="check" />
              </a>
            </Link> */}
            <Link href="#">
              <a target="_blank" rel="noreferrer noopener">
                More
              </a>
            </Link>
          </div>
        }
      />
    </div>
  )
}

export default TokenContract
