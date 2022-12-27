import React, { useState } from 'react'
import HeaderBlock from './HeaderBlock'
import Footer from 'components/Footer'

const Block = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false)

  const toggleMenu = () => {
    // document.querySelector('body').style.overflow = showMenu ? 'unset' : 'hidden'
    setShowMenu((prev) => !prev)
  }

  return (
    <>
      <HeaderBlock showMenu={showMenu} toggleMenu={toggleMenu} />
      {children}
      <Footer />
    </>
  )
}

export default Block
