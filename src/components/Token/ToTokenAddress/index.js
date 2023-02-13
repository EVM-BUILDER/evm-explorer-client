import CoppyText from 'components/Coppy/CoppyText'
import { Link } from 'components/Link'
import React from 'react'
import { BsCheckCircleFill, BsFileTextFill } from 'react-icons/bs'
import styled from 'styled-components'

const ToTokenAddressStyled = styled.div`
    .file-address {
        display: inline-flex;
        align-items: center;
        flex-direction: row;
        flex-wrap: nowrap;
        svg {
            fill: var(--primary);
            width: 16px;
            margin-right: 2px;
        }
    }
`

const ToTokenAddress = ({ txDetail }) => {
    return (
        <ToTokenAddressStyled>
            {txDetail?.ca ? (
                <div className="file-address">
                    [Contract &nbsp; <BsFileTextFill />
                    <Link className="address" href={`/address/${txDetail?.ca?.a}`}>
                        {txDetail?.ca?.pro?.na || txDetail?.ca?.a}
                    </Link>
                    &nbsp; Created] &nbsp;
                    <BsCheckCircleFill />
                    <CoppyText value={txDetail?.ca?.a}>
                        <img style={{ marginLeft: '10px' }} src="/images/icon/folder.svg" alt="" />
                    </CoppyText>
                </div>
            ) : txDetail?.t ? (
                <div className="link-with-copy">
                    <Link className="address" href={`/address/${txDetail.t.a}`}>
                        {txDetail.t.a || ''}
                    </Link>
                    <CoppyText value={txDetail?.t?.a}>
                        <img className="icon-right" style={{ marginLeft: '10px' }} src="/images/icon/folder.svg" alt="" />
                    </CoppyText>
                </div>
            ) : (
                'Unknown'
            )}
        </ToTokenAddressStyled>
    )
}

export default ToTokenAddress
