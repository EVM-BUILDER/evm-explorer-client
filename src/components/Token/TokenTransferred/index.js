import React from 'react'
import styled from 'styled-components'
import FormatAmount from 'components/FormatAmount'
import { roundNumber } from 'library/helpers/Number'
import { formatAddress } from 'utils/address'
import { useTokenContract } from 'hooks/useContract'

const TokenTransferredStyled = styled.div``

const TokenTransferred = ({ tokenTransfer }) => {
    const fAddress =
        tokenTransfer.f === '0x0000000000000000000000000000000000000000'
            ? 'Null Address: 0x000...000'
            : formatAddress(tokenTransfer?.f)
    const tAddress = formatAddress(tokenTransfer?.t)
    return (
        <TokenTransferredStyled>
            <span className="">
                <b>From</b>{' '}
            </span>
            <span className="hash-tag text-truncate ">
                <a href={`/token/${tokenTransfer.ca}?a=${fAddress}`}>
                    <span className="hash-tag text-truncate">
                        {fAddress}
                        &nbsp;
                    </span>
                </a>
            </span>
            <span>
                <b>To</b>{' '}
            </span>
            <span className="hash-tag text-truncate ">
                <a href={`/token/${tokenTransfer.ca}?a=${tAddress}`}>
                    <span>{tAddress}</span>
                </a>
            </span>
            <span>
                {' '}
                <b>For</b>{' '}
            </span>
            <span>
                <FormatAmount value={roundNumber(tokenTransfer.v, { decimals: 18, scale: 5 })} nullValue="0" />
            </span>
            <img src="/images/main/empty-token.png" width="15" alt="" />
            {tokenTransfer?.t?.na && (
                <a className="hash-tag text-truncate" href={`/token/${tAddress}`}>
                    &nbsp; {tokenTransfer.t?.na} ({tokenTransfer.t?.sym}){' '}
                </a>
            )}
        </TokenTransferredStyled>
    )
}

export default TokenTransferred
