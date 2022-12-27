import React, { useState } from 'react'
import Header from './Header'
import Footer from 'components/Footer'

const Menu = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false)
  const toggleMenu = () => {
    // document.querySelector('body').style.overflow = showMenu ? 'unset' : 'hidden'
    setShowMenu((prev) => !prev)
  }

  return (
    <>
      <Header showMenu={showMenu} toggleMenu={toggleMenu} />
      {children}
      <Footer />
    </>
  )
}

export default Menu
