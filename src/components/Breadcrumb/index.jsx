import Link from 'components/Link/Link'
import React from 'react'

const Breadcrumb = ({ listItems, ...props }) => {
    return (
        <div className="breadcrumb-wrapper">
            <ul className="breadcrumb">
                {listItems?.map((item, index) => {
                    const linkProps = !item.isCurrent ? { href: item.link } : {}
                    return (
                        <li className={`breadcrumb-item ${item?.isCurrent ? 'item-current' : ''}`} key={index}>
                            <Link {...linkProps}>{item?.title || ''}</Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Breadcrumb
