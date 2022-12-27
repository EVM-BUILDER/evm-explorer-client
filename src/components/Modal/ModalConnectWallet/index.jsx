import React from 'react'
import styled from 'styled-components'
import ModalBase from '../ModalBase'
import { connectorsList } from 'connectors'
import WalletCard from './WalletCard'
import useWalletAuth from 'hooks/useWalletAuth'
import { useSettings } from 'redux/settings/hooks'

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  row-gap: 16px;

  .wallet-item {
    color: #1e2022;
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #d5dae2;
    background-color: transparent;
    border-radius: 10px;
    cursor: pointer;

    display: flex;
    justify-content: space-between;

    &:hover {
      border: 1px solid var(--primary);
    }
    span {
      font-size: 16px;
      font-weight: 400;
    }
  }
`

const ConnectWalletButton = ({ isOpen, onClose, ...props }) => {
  const { login } = useWalletAuth()
  const { appurl } = useSettings()

  const walletList = connectorsList(appurl)

  // Filter out WalletConnect if user is inside TrustWallet built-in browser
  const walletsToShow =
    window.ethereum?.isTrust && !window?.ethereum?.isSafePal
      ? walletList.filter((wallet) => wallet.title !== 'WalletConnect')
      : walletList 

  const handleConnectWallet = (connectorId) => {
    login(connectorId)
    onClose()
  }

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title={'Connect a Wallet'}>
      <ModalContent>
        {walletsToShow.map((wallet) => {
          return <WalletCard key={wallet?.title} walletConfig={wallet} login={handleConnectWallet} />
        })}
      </ModalContent>
    </ModalBase>
  )
}

export default ConnectWalletButton
