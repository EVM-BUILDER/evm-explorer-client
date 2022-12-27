import React from 'react'
import styled from 'styled-components'
import useWalletAuth from 'hooks/useWalletAuth'

const ConnectWalletButtonStyled = styled.div``

const ConnectWalletButton = ({ title, children, ...props }) => {
  const { login } = useWalletAuth()

  const handleConnectWallet = (connectorId) => {
    login(connectorId)
    onClose()
  }

  return (
    <ConnectWalletButtonStyled onClick={handleConnectWallet} {...props}>
      {children ? children : <button>{title || 'Connect'}</button>}
    </ConnectWalletButtonStyled>
  )
}

export default ConnectWalletButton
