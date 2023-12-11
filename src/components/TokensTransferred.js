import React, { useEffect, useState } from 'react'
import CurrencyFormat from 'react-currency-format'
import Web3Token from 'library/web3/Web3Token'
import Link from 'components/Link/Link'
import styled from 'styled-components'

const TokensTransferredWrapper = styled.div`
    line-height: 30px;
    &:first-child {
        margin-top: 6px;
    }
    &:last-child {
        margin-bottom: 10px;
    }

    .transferred-span-1-child {
        color: ${({ theme }) => theme.colors.blackColor};
        font-weight: 700;
        margin-right: 4px;
    }

    .item-hash-token-transferred-link {
        color: ${({ theme }) => theme.colors.primaryColor};
        margin-right: 4px;
        width: 140px;
        max-width: 132px;
        display: inline-block;
        vertical-align: bottom;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .transferred-span-2-child {
        color: ${({ theme }) => theme.colors.blackColor};
        font-weight: 700;
    }

    .transferred-span-last-child {
        color: ${({ theme }) => theme.colors.blackColor};
        b {
            color: ${({ theme }) => theme.colors.blackColor};
            margin-right: 4px;
        }
        a {
            color: ${({ theme }) => theme.colors.primaryColor};
        }
        img {
            width: 15px;
            height: 15px;
            margin: 0 4px;
        }
    }
`

const tmp = {}

function TokensTransferred({ key, count, dataItem }) {
    const from = dataItem.events.find((o) => o.name === 'from')
    const to = dataItem.events.find((o) => o.name === 'to')
    const value = dataItem.events.find((o) => o.name === 'value')

    const [infoToken, setInfoToken] = useState()

    useEffect(() => {
        async function getInfoToken() {
            if (!tmp[dataItem.address]) {
                const web3 = new Web3Token(dataItem.address)
                const pInfoTOken = await web3.getFullInfo()
                tmp[dataItem.address] = pInfoTOken
                setInfoToken(pInfoTOken || null)
            }
        }

        if (dataItem.address) {
            getInfoToken()
        }
    }, [dataItem])

    return (
        <TokensTransferredWrapper key={key}>
            <span className="transferred-span-1-child"> ‣ From</span>
            <Link className="item-hash-token-transferred-link" href={`/address/${from?.value}`}>
                {' '}
                {from?.value}{' '}
            </Link>
            <span className="transferred-span-2-child">To</span>{' '}
            <Link className="item-hash-token-transferred-link" href={`/address/${to?.value}`}>
                {' '}
                {to?.value}
            </Link>
            <span className="transferred-span-last-child">
                <b>For</b>{' '}
                <CurrencyFormat value={value?.value / 1e18} displayType="text" thousandSeparator renderText={(value) => value} />{' '}
                <img src="https://polygonscan.com/images/main/empty-token.png" alt="" />
                {/* <Link href="/token/0xD50D167DD35D256e19E2FB76d6b9Bf9F4c571A3E">PlanetIX (PIX) </Link> */}
            </span>
            {/* <span className="transferred-span-last-child">
        <b>For</b>
        PN-721 TokenID [<Link href="/token/0xD50D167DD35D256e19E2FB76d6b9Bf9F4c571A3E?a=3942379">3942379</Link>
        ]
        <img src="https://polygonscan.com/images/main/empty-token.png" alt="" />
        <Link href="/token/0xD50D167DD35D256e19E2FB76d6b9Bf9F4c571A3E">PlanetIX (PIX) </Link>
      </span> */}
        </TokensTransferredWrapper>
    )
}

export default TokensTransferred
