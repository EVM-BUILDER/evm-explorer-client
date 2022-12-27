import React, { useState } from 'react'
import styled from 'styled-components'

const getLeft = ({ position }) => {
  if (position === 'left') {
    return '0'
  }
  return 'unset'
}
const getRight = ({ position }) => {
  if (position === 'right') {
    return '0'
  }
  return 'unset'
}

const WItemWithDropdown = styled.div`
  position: relative;
  .dropdown-body {
    display: none;
    padding-top: ${({ top }) => (top ? top : '')};
    z-index: 199;
    min-width: 30px;
    position: absolute;
    left: ${getLeft};
    right: ${getRight};
  }
  .dropdown-content {
    min-height: fit-content;
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
    background-color: var(--white);
    border-top: 3px solid var(--header-active-color);
    box-shadow: 0 8px 20px rgb(130 71 229 / 12%);
  }

  &:hover {
    & > .dropdown-body {
      display: block;
      height: fit-content;
    }
  }
`

const ItemWithDropdown = ({ initialOpenState, top, content, position = 'left', showArrow, children }) => {
  const [isOpen, setIsOpen] = useState(initialOpenState)

  return (
    <WItemWithDropdown isOpen={isOpen} top={top} position={position}>
      <div className="dropdown-title">
        {children}
        {showArrow && (
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M192 384c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L192 306.8l137.4-137.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-160 160C208.4 380.9 200.2 384 192 384z" />
            </svg>
          </span>
        )}
      </div>
      {content && (
        <div className="dropdown-body fadeIn">
          <div className="dropdown-content">{content}</div>
        </div>
      )}
    </WItemWithDropdown>
  )
}

export default ItemWithDropdown
