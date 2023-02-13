import React, { useState } from 'react'
import styled from 'styled-components'
import { CopyOutlined } from '@ant-design/icons'

const WrapCoppyText = styled.div`
    display: flex;
    position: relative;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

    .coppied-success {
        color: #8c98a4;
        font-size: 14px;
        width: 150px;
        position: absolute;
        top: 100%;
        left: 0;
    }
`

const CoppyText = ({ value, disabled, onSuccess, children, ...props }) => {
    const [isCoppy, setIsCoppy] = useState(false)
    const setIsCopped = () => {
        setIsCoppy(!isCoppy)
        setInterval(() => {
            setIsCoppy(isCoppy)
            onSuccess?.(isCoppy)
        }, 5000)
        navigator.clipboard.writeText(value)
    }

    return (
        <WrapCoppyText onClick={setIsCopped} disabled={disabled} {...props}>
            {children || <CopyOutlined />}
            {isCoppy && <span className="coppied-success">Copied</span>}
        </WrapCoppyText>
    )
}

export default CoppyText
