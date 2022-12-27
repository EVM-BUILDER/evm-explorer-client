import React from 'react'
import { createGlobalStyle } from 'styled-components'
import QRCode from 'qrcode.react'
import ModalBase from '../ModalBase'

const GlobalModalQrCodeStyle = createGlobalStyle`
.modal-qrcode {
  .modal-base-title { 
    font-size: 12px;
  }
  .modal-qrcode-content {
    display: flex;
    justify-content: center;
  }
}
`

const ModalQrCode = ({ title, isOpen, address, onClose, ...props }) => {
  return (
    <ModalBase isOpen={isOpen} title={title} onClose={onClose} className="modal-qrcode" {...props}>
      <GlobalModalQrCodeStyle />
      <div className="modal-qrcode-content">
        <QRCode size={220} value={address} includeMargin fgColor="#000" bgColor="#fff" />
      </div>
    </ModalBase>
  )
}

export default ModalQrCode
