import CoppyText from 'components/Coppy/CoppyText'
import { Link } from 'components/Link'
import React from 'react'
import { BsCheckCircleFill, BsFileTextFill } from 'react-icons/bs'
import styled from 'styled-components'

const ToTokenAddressStyled = styled.div`
    .file-address {
        white-space: nowrap;
        display: inline-flex;
        align-items: center;
        flex-direction: row;
        flex-wrap: nowrap;
        svg {
            fill: var(--primary);
            width: 16px;
            margin-right: 2px;
        }

        a {
            max-width: 100px;
            ${({ theme }) => theme.mediaQueries.sm} {
                max-width: unset;
            }
        }
    }
`

const ToTokenAddress = ({ txDetail }) => {
    return (
        <ToTokenAddressStyled>
            {txDetail?.ca ? (
                <div className="file-address">
                    [Contract &nbsp; <BsFileTextFill />
                    <Link className="address text-truncate" href={`/address/${txDetail?.ca?.a}`}>
                        {txDetail?.ca?.a}
                    </Link>
                    &nbsp; Created] {txDetail?.ca?.pro?.na ? `(${txDetail?.ca?.pro?.na})` : ''}&nbsp;
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
