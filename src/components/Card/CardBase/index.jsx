import React from 'react'

const CardBase = ({ title, rightNode, content, backgroundHeader }) => {
  return (
    <div className="card_base">
      <div className="card_base_header" style={{ background: backgroundHeader }}>
        <div className="card_base_header_title">{title}</div>
        {rightNode}
      </div>
      <div className="card_base_content">{content}</div>
    </div>
  )
}

export default CardBase
