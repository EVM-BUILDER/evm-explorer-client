import React from 'react'
import styled from 'styled-components'

const ReviewTypeStyled = styled.div`
  img {
    width: 8px;
    height: auto;
    object-fit: contain;
  }
`

const ReviewType = ({ outputs }) => {
  return (
    <ReviewTypeStyled>
      <img src="/images/icon/shape-1.svg" alt="" />{' '}
      {outputs?.map((output, index) => {
        return (
          <span key={output.name} className="text-monospace ">
            {output.name}
            {` `}
            <i>{output.type}</i>
            {index > 0 ? `, ` : ''}
          </span>
        )
      })}
    </ReviewTypeStyled>
  )
}

export default ReviewType
