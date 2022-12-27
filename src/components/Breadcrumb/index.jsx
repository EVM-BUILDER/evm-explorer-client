import Link from 'components/Link/Link'
import React from 'react'

const Breadcrumb = ({ listItems , ...props}) => {
  return (
    <div className="breadcrumb-wrapper">
      <ul className="breadcrumb">
        {listItems?.map((item, index) => (
          <li className={`breadcrumb-item ${item?.isCurrent ? 'item-current' : ""}`} key={index}>
            <Link href={item?.link || ""}>
              {item?.title || ""}
            </Link>
          </li>
        ))}
        </ul>
    </div>
  )
}

export default Breadcrumb
