import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'components/Link'

const AccordionStyled = styled.div`
  .menu-item {
    color: var(--header-color);
    font-size: var(--header-color);
    font-weight: var(--header-font-weight);
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &.menu-item-active {
      color: var(--header-active-color);
    }

    .menu-arrow-item svg {
      width: 10px;
      height: 10px;
      path {
        fill: $color-header-fill;
      }
    }
  }

  .border-item {
    width: 100%;
    border-bottom: 1px solid #f4f4f4;
  }

  .submenu {
    max-height: 0;
    margin: 0;
    padding: 0;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    background-color: ${({ theme }) => theme.li};
    border-left: 2px solid var(--primary);
    box-shadow: inset 0 8px 20px rgba(130, 71, 229, 8%);
    overflow: hidden;
    transform: scaleY(0);
    transform-origin: top;
    transition: all 0.26s ease;

    &.submenu-active {
      transform: scaleY(1);
      max-height: 400px;
      overflow: auto;
    }

    .submenu-item {
      padding: 6px 16px;
      &:first-child {
        padding-top: 12px;
      }
      &:last-child {
        padding-bottom: 12px;
      }
    }
    .submenu-item-label {
      color: var(--header-color);
      &:hover {
        color: var(--header-active-color);
      }
    }

    .submenu-item-active {
      .submenu-item-label {
        color: var(--header-active-color);
      }
    }
  }
`

const Accordion = ({ title, url, target, child, initialOpenState, showBorder, activeSubItem, toggleMenu }) => {
  const [isOpen, setIsOpen] = useState(initialOpenState)

  return (
    <AccordionStyled>
      <Link
        {...(url && { href: url })}
        {...(target && { target })}
        className={`menu-item ${initialOpenState ? 'menu-item-active' : ''}`}
        onClick={() => {
          setIsOpen((prev) => !prev)
          if (!child || child?.length <= 0) {
            toggleMenu()
          }
        }}
      >
        {title}
        {child?.length > 0 && (
          <span className="menu-arrow-item" style={{ transform: isOpen ? 'rotate(180deg' : 'rotate(0)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M192 384c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L192 306.8l137.4-137.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-160 160C208.4 380.9 200.2 384 192 384z" />
            </svg>
          </span>
        )}
      </Link>
      {showBorder && <div className="border-item" />}
      {child?.length > 0 && (
        <ul className={`submenu ${isOpen ? 'submenu-active' : ''}`}>
          {child.map((submenu) => {
            const isSubItemActive = activeSubItem?.url === submenu.url
            return (
              <React.Fragment key={submenu.title}>
                <li className={`submenu-item ${isSubItemActive ? 'submenu-item-active' : ''}`}>
                  <Link
                    className="submenu-item-label"
                    {...(submenu.url && { href: submenu.url })}
                    {...(submenu.target && { target: submenu.target })}
                    onClick={toggleMenu}
                  >
                    {submenu.title}
                  </Link>
                </li>
                {submenu.showBorder && <div className="border-item" />}
              </React.Fragment>
            )
          })}
        </ul>
      )}
    </AccordionStyled>
  )
}

export default Accordion
