import React from 'react'
import dynamic from 'next/dynamic'
import styled from 'styled-components'
import EmptyContract from 'components/EmptyContract'
// import Contract from 'components/Contract/Contract'
// import Contract from 'components/ContractCode'

const Contract = dynamic(() => import('components/Contract'), {
  ssr: false,
})

const WTabContract = styled.div`
  min-height: 200px;
`

const TabContract = ({ address, addressDetail, ...props }) => {
  return (
    <WTabContract>
      {addressDetail?.ab ? (
        <Contract address={address} addressDetail={addressDetail} {...props} />
      ) : (
        <EmptyContract address={address} />
      )}
    </WTabContract>
  )
}

export default TabContract
