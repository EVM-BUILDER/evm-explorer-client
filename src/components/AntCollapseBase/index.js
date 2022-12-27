import React from 'react'
import { Collapse } from 'antd'
import styled from 'styled-components'

const WrapCollapseStyled = styled(Collapse)``

const CollapseBase = ({ panels, panel, ...props }) => {
  return (
    <WrapCollapseStyled expandIconPosition="end" defaultActiveKey={['1']} {...props}>
      {panels ? (
        panels.map((panelItem) => (
          <Collapse.Panel key={panelItem.key} header={panelItem.title}>
            {panelItem.content}
          </Collapse.Panel>
        ))
      ) : (
        <Collapse.Panel key={panel.key} header={panel.title}>
          {panel.content}
        </Collapse.Panel>
      )}
    </WrapCollapseStyled>
  )
}

export default CollapseBase
