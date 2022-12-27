import React from 'react'

/**
 * @Dev
 * @param {@} className
 * @param {@} size small |standard | larger
 */

const ButtonSecondary = ({ className, size, children, ...props }) => (
  <button className={`button-secondary ${className || ''}`} type="button" data-size={size || 'standard'} {...props}>
    {children}
  </button>
)

export default ButtonSecondary
