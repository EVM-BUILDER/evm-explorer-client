import React, { useMemo } from 'react'
import { useRouter } from 'next/router'
import { Tabs } from 'antd'
import styled from 'styled-components'
import CodeContract from './CodeContract'
import ReadContract from './ReadContract'
import WriteContract from './WriteContract'
import useMatchBreakpoints from 'hooks/useMatchBreakpoints'

const TabsContractStyled = styled(Tabs)`
  .ant-tabs-nav::before {
    border-bottom: none;
  }
  .ant-tabs-nav-list {
    margin-bottom: 8px;
    & > .ant-tabs-tab {
      padding: 0;
      margin-right: 10px;
      background: transparent;
      border: unset;
      .ant-tabs-tab-btn {
        color: #3c3a3a;
        font-size: 16px;
        font-weight: 500;
        line-height: 21px;
        padding: 4px 8px;
        height: 29px;
        background: #eeeeee;
        border-radius: 4px;
      }
    }
    .ant-tabs-tab-active .ant-tabs-tab-btn {
      color: #eeeeee;
      background-color: #3c3a3a;
    }
  }
`

export const CONTRACT_CODE_VIEW = {
  CODE: 'code',
  READ_CONTRACT: 'readContract',
  WRITE_CONTRACT: 'writeContract',
}

const Contract = ({ address, addressDetail }) => {
  const router = useRouter()
  const { isMobile } = useMatchBreakpoints()

  const tabPath = router.asPath.split('#')[0]
  const tabPathActive = router.asPath.split('#')[1]
  const handleChangeTab = (tab) => {
    router.replace(`${tabPath}#${tab}`)
  }

  const readAbi = useMemo(() => {
    if (!addressDetail?.ab) return []
    return addressDetail.ab.filter((abi) => abi.stateMutability === 'view' && abi.type === 'function')
  }, [addressDetail])

  const writeAbi = useMemo(() => {
    if (!addressDetail?.ab) return []
    return addressDetail?.ab?.filter((abi) => abi.stateMutability !== 'view' && abi.type === 'function')
  }, [addressDetail])

  return (
    <TabsContractStyled
      type="card"
      activeKey={Object.values(CONTRACT_CODE_VIEW).includes(tabPathActive) ? tabPathActive : CONTRACT_CODE_VIEW.CODE}
      onChange={handleChangeTab}
      items={[
        {
          key: CONTRACT_CODE_VIEW.CODE,
          label: 'Code',
          children: <CodeContract addressDetail={addressDetail} />,
        },
        {
          key: CONTRACT_CODE_VIEW.READ_CONTRACT,
          label: isMobile ? 'Read' : 'Read Contract',
          children: <ReadContract address={address} readAbi={readAbi} />,
        },
        {
          key: CONTRACT_CODE_VIEW.WRITE_CONTRACT,
          label: isMobile ? 'Write' : 'Write Contract',
          children: <WriteContract address={address} writeAbi={writeAbi} />,
        },
      ]}
    />
  )
}

export default Contract
