import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Space, Modal } from 'antd'
import styled from 'styled-components'
import { Link } from 'components/Link'
import CoppyText from 'components/Coppy/CoppyText'
import { formatCode } from 'library/helpers/CommonHelper'
import { ADDRESS_TYPE } from 'redux/constants'
import ModalQrCode from 'components/Modal/ModalQrCode'

const WHeaderAddress = styled.div`
  padding-top: 12px;
  padding-bottom: 12px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  .tx-detail-address {
    font-size: 18px;
    color: var(--text);

    display: flex;
    flex-flow: row wrap;
    align-items: center;
    ${({ theme }) => theme.mediaQueries.md} {
      font-size: 21px;
      flex-wrap: nowrap;
    }

    & > img {
      width: 16px;
      height: 16px;
      margin-top: -2px;
      margin-right: 6px;
      border-radius: 4px;
    }
    & > strong {
      color: #3c3a3a;
      font-weight: 700;
      font-size: 24px;
      line-height: 31px;
      margin-right: 10px;
    }

    .address_address {
      color: #3c3a3a;
      font-weight: 400;
      font-size: 16px;
      line-height: 1.5;
      margin-right: 12px;
    }
    .address_head_actions {
      a {
        display: flex;
      }
      img {
        width: 18px;
        height: 18px;
        object-fit: contain;
        cursor: pointer;
      }
    }
  }
  .heading-right {
    display: flex;
    row-gap: 8px;
    column-gap: 16px;
    flex-wrap: wrap;

    > a {
      font-weight: 500;
      font-size: 12px;
      line-height: normal;
      text-align: center;
      color: var(--text);

      min-width: 100px;
      border-radius: 4px;
      padding: 4px 16px;
      background-color: var(--tertiary);
    }
  }

  div {
    margin-bottom: 0;

    button {
      color: white;
      border-radius: 6px;
      font-size: 11.2px;
      font-weight: 700;
      padding: 4.8px 9.6px;
      background: var(--primary);

      svg {
        font-weight: bold;
      }
    }
  }

  .ant-btn-primary {
    background: transparent;
    color: transparent;
    border: none;
    outline: none;
    box-shadow: none;

    .anticon-appstore {
      &:hover {
        background: #77838f;

        svg {
          path {
            fill: var(--secondary);
          }
        }
      }
    }
  }
`

const HeaderAddress = ({ address, addressType, menuSubHeader }) => {
  const [modalQrCode, setModalQrCode] = useState(false)
  return (
    <WHeaderAddress className="container">
      <div className="tx-detail-address">
        <img src="/images/icon/random-account.png" alt="" />
        <strong>{addressType === ADDRESS_TYPE.address ? 'Address' : 'Contract'}</strong>
        <div className="address_address">{formatCode(address || '', 6, 6)}</div>
        <Space className="address_head_actions">
          <CoppyText value={address}>
            <img src="/images/icon/coppy_icon.png" alt="" />
          </CoppyText>
          <a onClick={() => setModalQrCode(true)}>
            <img src="/images/icon/qr_icon.png" alt="" />
          </a>
          {/* <img src="/images/icon/textbox_icon.png" alt="" /> */}
          {/* <img src="/images/icon/chat_dot_icon.png" alt="" /> */}
        </Space>
      </div>
      <div className="heading-right">
        {menuSubHeader?.map((menu) => (
          <Link key={menu.title} href={menu.url}>
            {menu.title}
          </Link>
        ))}
        {/* 
        <Link href="#" passHref>
          Exchange
        </Link>
        <Link href="#" passHref>
          Earn
        </Link>
        <Link href="#" passHref>
          Gaming
        </Link> */}

        <ModalQrCode
          isOpen={modalQrCode}
          maxWidth="380px"
          title={address}
          address={address}
          onClose={() => setModalQrCode(false)}
        />
      </div>
      {/* <div>
          <Space wrap>
            <Dropdown overlay={Exchange} trigger={['click']}>
              <Button>
                Exchange <DownOutlined />
              </Button>
            </Dropdown>
            <Dropdown overlay={Earn} trigger={['click']}>
              <Button>
                Earn <DownOutlined />
              </Button>
            </Dropdown>
            <Dropdown overlay={Gaming} trigger={['click']}>
              <Button>
                Gaming <DownOutlined />
              </Button>
            </Dropdown>
          </Space>
        </div> */}
    </WHeaderAddress>
  )
}

export default HeaderAddress
