import React from 'react'
import styled from 'styled-components'
import { Link } from 'components/Link'

const BoxInOutStyled = styled.div`
  display: flex;
  align-items: center;
  .address {
    display: inline-block;
    color: var(--primary);
    max-width: 170px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

const BoxInOut = ({ address, f, hideInOut, position = 'right' }) => {
  const isOut = address?.toLowerCase() === f?.a?.toLowerCase()
  return (
    <BoxInOutStyled>
      {!hideInOut && (
        <span
          className={isOut ? 'out' : 'in'}
          style={position === 'left' ? { order: 1, marginRight: '6px' } : { order: 2, marginLeft: '6px' }}
        >
          {isOut ? 'OUT' : 'IN'}
        </span>
      )}
      <div style={position === 'left' ? { order: 2, marginRight: '6px' } : { order: 1, marginLeft: '6px' }}>
        {isOut ? (
          <span className="address">{f?.a || ''}</span>
        ) : (
          <Link className="address" href={`/address/${f?.a}`}>
            {f?.a || ''}
          </Link>
        )}
      </div>
    </BoxInOutStyled>
  )
}

export default BoxInOut
