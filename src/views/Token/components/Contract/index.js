import React from 'react'
import styled from 'styled-components'
import dynamic from 'next/dynamic'
import EmptyContract from 'components/EmptyContract'
// import PN_20 from 'config/abis/erc20.json'
// import Contract from 'components/Contract/Contract'
// import Contract from 'components/ContractCode'

const Contract = dynamic(() => import('components/Contract'), {
  ssr: false,
})

const WTabContract = styled.div`
  min-height: 200px;
`

const TabContract = ({ token, addressDetail }) => {
  return (
    <WTabContract>
      {addressDetail?.ab ? <Contract address={token} addressDetail={addressDetail} /> : <EmptyContract />}
    </WTabContract>
  )
}

export default TabContract
