import React from 'react'
import { Link } from 'components/Link'

const TokenHeader = ({ addressDetail, menuSubHeader }) => {
  return (
    <div className="container token-heading">
      <div className="heading-left">
        <div className="token">
          <div className="token-image">
            <img src={addressDetail?.pro?.ico || 'https://polygonscan.com/images/main/empty-token.png'} alt="" />
          </div>
          <div className="token-symbol">Token</div>
          <div className="token-name">{addressDetail?.pro.na}</div>
        </div>

        {/* <div className="btn-group">
          <div>Bitfinex</div>
          <div>Stablecoin</div>
        </div> */}
      </div>

      <div className="heading-right">
        {menuSubHeader?.map((menu) => (
          <Link key={menu.title} href={menu.url}>
            {menu.title}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default TokenHeader
