import React from 'react'
import eye from '../../../../../public/images/icon/emojione_eye-in-speech-bubble.png'
import arrowRight from '../../../../../public/images/icon/arrow-right.png'
import tether from '../../../../../public/images/icon/tethericon.png'

const BlockTransfers = () => {
  return (
    <tr className="block-transfers">
      <td>
        <span>
          <img src={eye} className="down" />
          kjbas8127jbsdc23DS...
        </span>
      </td>

      <td>10 Secs ago</td>

      <td>212asdb12s15asd</td>

      <td>
        <span>
          <img src={arrowRight} className="down" />
          212asdb12s15asd
        </span>
      </td>

      <td>1512315</td>

      <td>
        <span>
          <img src={tether} className="down" />
          Tether USDT&#41;
        </span>
      </td>

      <td>
        <div>View NFT &nbsp; &gt;</div>
      </td>
    </tr>
  )
}

export default BlockTransfers
