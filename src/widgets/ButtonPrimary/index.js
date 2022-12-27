import React from 'react'

/**
 * @Dev
 * @param {@} className
 * @param {@} size small |standard | larger
 */

const ButtonPrimary = ({ className, size, children, ...props }) => (
  <button className={`button-primary ${className || ''}`} type="button" data-size={size || 'standard'} {...props}>
    {children}
  </button>
)

export default ButtonPrimary
