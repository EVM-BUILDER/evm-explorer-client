import React, { useState } from 'react'
import { Space } from 'antd'
import styled from 'styled-components'
import CollapseBase from 'components/CollapseBase'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { formatCode } from 'library/helpers/CommonHelper'
import ModalConnectWallet from 'components/Modal/ModalConnectWallet'
import ContractResult from '../ContractResult'
import { useContract } from 'hooks/useContract'
import { ABI_ACTION_TYPE } from 'redux/constants'

const WriteContractStyled = styled.div`
  .top-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;

    .top-label-left {
      display: flex;
      align-items: center;
      button.connect_wallet {
        color: #fff;
        font-weight: 400;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;

        padding: 0.375rem 0.75rem;
        user-select: none;
        background-color: #6c757d;
        border: 1px solid transparent;
        border-radius: 0.25rem;
        transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
          box-shadow 0.15s ease-in-out;
      }
      a.connect_success {
        color: #fff;
        font-weight: 400;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;

        padding: 0.375rem 0.75rem;
        user-select: none;
        background-color: var(--primary);
        border: 1px solid transparent;
        border-radius: 0.25rem;
        transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
          box-shadow 0.15s ease-in-out;
      }
    }
    .top-label-right {
      a {
        font-size: 14px;
        font-weight: 500;
        &:first-child {
          margin-right: 8px;
        }
        &:hover {
          color: var(--primary);
        }
      }
    }
  }
  .read-contract-method-right-node {
    width: 24px;
    height: 24px;
    margin-right: 12px;
  }
`

const WriteContract = ({ address, writeAbi }) => {
  const [expandAll, setExpandAll] = useState(false)
  const [modalConnect, setModalConnect] = useState({ isOpen: false, dataModal: null })

  const { account } = useActiveWeb3React()

  const contract = useContract(address, writeAbi)

  const handleExpandAll = () => {
    setExpandAll((prev) => !prev)
  }

  return (
    <WriteContractStyled>
      <div className="top-label">
        <div className="top-label-left">
          {account ? (
            <a className="connect_success" href={`/address/${account}`} target="_blank" rel="noreferrer">
              Connected - Web3 [<u>{formatCode(account, 6, 4)}</u>]
            </a>
          ) : (
            <button
              type="button"
              className="connect_wallet"
              onClick={() => {
                setModalConnect((prev) => ({ ...prev, isOpen: true }))
              }}
            >
              Connect to Web3
            </button>
          )}
        </div>
        <div className="top-label-right">
          <a onClick={handleExpandAll}>{expandAll ? '[Collapse all]' : '[Expand All]'}</a>
          <a>[Reset]</a>
        </div>
      </div>

      <Space direction="vertical" size={16} style={{ width: '100%' }}>
        {writeAbi?.map((abi, i) => {
            console.log('abi', abi, i)
          return (
            <CollapseBase
              key={abi.name}
              title={`${i + 1}. ${abi.name}`}
              expandAll={expandAll}
              rightNode={<img className="read-contract-method-right-node" src="/images/icon/share_icon.png" alt="" />}
              content={<ContractResult type={ABI_ACTION_TYPE.write} address={address} abi={abi} contract={contract} />}
            />
          )
        })}
      </Space>
      <br />
      <br />
      <br />
      <ModalConnectWallet
        isOpen={modalConnect.isOpen}
        dataModal={modalConnect.dataModal}
        onClose={() => setModalConnect((prev) => ({ ...prev, isOpen: false }))}
      />
    </WriteContractStyled>
  )
}

export default WriteContract
