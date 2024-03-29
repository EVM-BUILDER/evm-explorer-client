import React, { Fragment, useState } from 'react'
import { Layout } from 'antd'
import { MenuOutlined, CloseOutlined } from '@ant-design/icons'
import styled from 'styled-components'

const WrapSidebar = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
`

const Sidebar = ({ tabList, activeTab, onChangeTab, userInfo }) => {
    const [showSideBar, setShowSideBar] = useState(false)

    const handleSidebar = () => {
        setShowSideBar(!showSideBar)
    }
    return (
        <>
            <Layout className="overview-page_content_left">
                <div>
                    {tabList.map((entry) => {
                        if (entry.items.length > 0) {
                            return (
                                <Fragment key={entry.label}>
                                    <h1>{entry.label}</h1>
                                    <ul>
                                        {entry.items.map((subItem) => {
                                            return (
                                                <li
                                                    key={subItem.label}
                                                    onClick={() => onChangeTab(subItem.href)}
                                                    className={`${activeTab === subItem.href ? 'account-active' : ''}`}
                                                >
                                                    <a href={subItem.href}>
                                                        <img src={subItem.image} alt={subItem.label} />
                                                        <span>{subItem.label}</span>
                                                    </a>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </Fragment>
                            )
                        }
                        return <h1 key={entry.label}>{entry.label}</h1>
                    })}
                </div>
            </Layout>
            <div className="overview-page_content_tablet">
                <WrapSidebar>
                    <div className="menu-title">
                        <h1>USERNAME</h1>
                        <p>{userInfo?.profile?.email || ''}</p>
                    </div>
                    <div className="overview-page-collapse" onClick={handleSidebar}>
                        {showSideBar ? <CloseOutlined /> : <MenuOutlined />}
                    </div>
                </WrapSidebar>

                {showSideBar && (
                    <div className="menu-title">
                        {tabList.map((entry) => {
                            if (entry.items.length > 0) {
                                return (
                                    <Fragment key={entry.label}>
                                        <h1>{entry.label}</h1>
                                        <ul>
                                            {entry.items.map((subItem) => {
                                                return (
                                                    <li
                                                        key={subItem.label}
                                                        onClick={() => onChangeTab(subItem.href)}
                                                        className={`${activeTab === subItem.href ? 'account-active' : ''}`}
                                                    >
                                                        <a href={subItem.href}>
                                                            <img src={subItem.image} alt={subItem.label} />
                                                            <span>{subItem.label}</span>
                                                        </a>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </Fragment>
                                )
                            }
                            return <h1 key={entry.label}>{entry.label}</h1>
                        })}
                    </div>
                )}
            </div>
        </>
    )
}

export default Sidebar
