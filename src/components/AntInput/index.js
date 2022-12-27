import { Input } from 'antd'
import React from 'react'
import styled from 'styled-components'

const CustomInput = styled.div`
  .ant-input,
  .ant-input-affix-wrapper {
    width: 100%;
    min-height: ${({ height }) => height || '32px'};
    border-radius: 4px;
    border-color: var(--border-color);
    box-shadow: unset !important;
    &:hover,
    &:focus,
    &:valid {
      border-color: var(--border-color);
      box-shadow: unset !important;
      outline: unset;
    }
  }
  .ant-input-affix-wrapper .ant-input {
    min-height: unset;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
  }
  input::placeholder {
    font-weight: 400;
    font-size: 14px;
  }
`

const AntInput = ({ height, suffix = '', prefix = '', ...props }) => {
  return (
    <CustomInput height={height}>
      <Input suffix={suffix} prefix={prefix} {...props} />
    </CustomInput>
  )
}

export default AntInput
