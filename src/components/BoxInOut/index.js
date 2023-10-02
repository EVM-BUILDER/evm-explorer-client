import React from 'react'
import styled from 'styled-components'
import { Link } from 'components/Link'
import { formatCode } from 'library/helpers/CommonHelper'

const BoxInOutStyled = styled.div`
    display: flex;
    align-items: center;
    .box-right {
        display: flex;
        align-items: center;
        a {
            display: inline-block;
            color: var(--primary);
            max-width: 170px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        span {
            display: inline-block;
            max-width: 170px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
`

const BoxInOut = ({ address, isContract, type = 'from', f, t, hideInOut, position = 'right' }) => {
    const isOwner = address?.toLowerCase() === f?.a?.toLowerCase()
    return (
        <BoxInOutStyled>
            {!hideInOut && (
                <span
                    className={isOwner ? 'out' : 'in'}
                    style={position === 'left' ? { order: 1, marginRight: '6px' } : { order: 2, marginLeft: '6px' }}
                >
                    {isOwner ? 'OUT' : 'IN'}
                </span>
            )}
            <div
                className="box-right"
                style={position === 'left' ? { order: 2, marginRight: '6px' } : { order: 1, marginLeft: '6px' }}
            >
                {type === 'from' ? (
                    <>
                        {address?.toLowerCase() === f?.a?.toLowerCase() ? (
                            <span className="text">{f.a}</span>
                        ) : isContract ? (
                            <>
                                [Contract &nbsp;
                                <Link className="address" href={`/address/${f.a}`}>
                                    {f.a}
                                </Link>{' '}
                                &nbsp; Created] (name)
                            </>
                        ) : (
                            <Link className="address" href={`/address/${f.a}`}>
                                {f.a}
                            </Link>
                        )}
                    </>
                ) : (
                    <>
                        {address?.toLowerCase() === t?.a?.toLowerCase() ? (
                            <span className="text">{t?.a}</span>
                        ) : isContract ? (
                            <>
                                [Contract &nbsp;
                                <Link className="address" href={`/address/${t.a}`}>
                                    {formatCode(t.a, 4, 6)}
                                </Link>{' '}
                                &nbsp; Created] {t.na ? `(${t.na})` : ''}
                            </>
                        ) : (
                            <Link className="address" href={`/address/${t.a}`}>
                                {t.a}
                            </Link>
                        )}
                    </>
                )}
            </div>
        </BoxInOutStyled>
    )
}

export default BoxInOut
