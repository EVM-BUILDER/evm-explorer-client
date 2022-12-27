import { Input, Select } from 'antd'
import React from 'react'
import styled from 'styled-components'

const CustomAntSelect = styled.div`
  .ant-select .ant-select-selector,
  .ant-select .ant-select-selector :hover,
  .ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border-color: var(--border-color);
  }
  .ant-select .ant-select-selector {
    min-height: ${({ height }) => height || '32px'};
    border-radius: 4px;
    border-color: var(--border-color);
    box-shadow: unset !important;
  }
  .ant-select .ant-select-arrow {
    background-image: url('/images/verify/up-down-icon.png');
    background-position: calc(100% - 0.5rem), 100% 0;
    background-size: 1em 1em;
    background-repeat: no-repeat;
  }
  .ant-select .ant-select-arrow > span {
    margin-left: 30px;
  }
  .ant-select .ant-select-arrow .anticon > svg {
    display: none;
  }
`

const AntSelect = ({ height, suffix = '', prefix = '', ...props }) => {
  return (
    <CustomAntSelect height={height}>
      <Select suffix={suffix} prefix={prefix} {...props}>
        <Select.Option value="other">other</Select.Option>
      </Select>
    </CustomAntSelect>
  )
}

export default AntSelect
