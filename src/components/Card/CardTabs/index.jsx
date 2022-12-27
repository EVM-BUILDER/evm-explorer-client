import React from 'react'
import { Tabs } from 'antd'

const CardTabs = ({ activeKey, tabs, tabProps = {}, ...props }) => {
  return (
    <Tabs className="card-tabs" activeKey={activeKey} defaultActiveKey={tabs?.[0]?.key} {...props}>
      {tabs.map((tab) => {
        return (
          <Tabs.TabPane tab={tab.title} tabKey={tab.key} key={tab.key} className="card-tabs-content" {...tabProps}>
            {tab.content}
          </Tabs.TabPane>
        )
      })}
    </Tabs>
  )
}

export default CardTabs
