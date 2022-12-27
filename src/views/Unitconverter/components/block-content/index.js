import React from 'react'
import { BsFolder } from 'react-icons/bs'

const BlockContent = () => {
  return (
    <div className="block-content">
      <div className="left">
        <div className="icon">
          <BsFolder />
        </div>
        <p className="code">100000000000000000</p>
      </div>
      <div className="price right">
        <p>
          Wei (10<sup>-18</sup>)
        </p>
      </div>
    </div>
  )
}

export default BlockContent
