import React from 'react'
import dynamic from 'next/dynamic'
import styled from 'styled-components'
// import Contract from 'components/Contract/Contract'
// import Contract from 'components/ContractCode'

const Contract = dynamic(() => import('components/Contract'), {
  ssr: false,
})

const WTabContract = styled.div`
  min-height: 200px;
`

const TabContract = (props) => {
  return (
    <WTabContract>
      <Contract {...props} />
    </WTabContract>
  )
}

export default TabContract
