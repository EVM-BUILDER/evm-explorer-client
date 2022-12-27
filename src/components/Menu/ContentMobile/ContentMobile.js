import React from 'react'
import styled from 'styled-components'
import Account from '../Account'
import Accordion from '../components/Accordion'

const DrawMenuContent = styled.div`
  padding-top: 16px;
  padding-bottom: 0;
  .nav-account-mobile {
    height: 40px;
    display: flex;
    align-items: center;
    .avatar {
      width: 16px;
      height: 16px;
    }
    .username {
      margin-left: 5px;
    }
  }
`

const ContentMobile = ({ showMenu, links, activeItem, activeSubItem, toggleMenu }) => {
  return (
    <DrawMenuContent className={`container ${showMenu ? 'active' : ''}`}>
      {links.map((entry) => {
        const isActive = activeItem?.title === entry.title
        return (
          <Accordion
            key={entry.title}
            {...entry}
            initialOpenState={isActive}
            activeSubItem={activeSubItem}
            toggleMenu={toggleMenu}
          />
        )
      })}
      <div className="nav-account-mobile">
        <Account iconFirst onClickMenuItem={toggleMenu} />
      </div>
    </DrawMenuContent>
  )
}

export default ContentMobile
