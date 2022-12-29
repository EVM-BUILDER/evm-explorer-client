import { Checkbox } from 'antd'
import styled from 'styled-components'

const AntCheckbox = styled(Checkbox)`
  &::after,
  .ant-checkbox-inner,
  .ant-checkbox-checked::after {
    width: 18px;
    height: 18px;
    border-color: var(--primary) !important;
  }
  &::after {
    content: unset;
  }

  .ant-checkbox,
  .ant-checkbox-inner,
  .ant-checkbox-checked::after {
    border-radius: 6px;
  }

  .ant-checkbox {
    &:hover {
      border: unset;
    }
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: var(--primary);
  }
`

export default AntCheckbox
