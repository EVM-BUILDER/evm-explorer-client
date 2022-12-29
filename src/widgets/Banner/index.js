import { Carousel } from 'antd'
import React from 'react'
import { useSettings } from 'redux/settings/hooks'
import styled from 'styled-components'

const WBanner = styled.div`
  max-width: 400px;
  height: 160px;
  margin-left: auto;
  img {
    width: auto;
    height: 160px;
    background: '#364d79';
  }
`

const Banner = () => {
  const settings = useSettings()
  const adsSearchBanner = settings?.ads_search_banner
  return (
    <WBanner>
      {adsSearchBanner && (
        <Carousel autoplay dots={false}>
          {adsSearchBanner.map((item) => {
            return (
              <a
                className="banner-container"
                key={item.key}
                {...(item.url && { href: item.url })}
                target="_blank"
                rel="noreferrer"
              >
                <img className="qr-code" src={item.image} alt="" />
              </a>
            )
          })}
        </Carousel>
      )}
    </WBanner>
  )
}

export default Banner
