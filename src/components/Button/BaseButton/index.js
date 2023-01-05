import React from 'react'
import { ClassNames } from 'utils/classNames.util'

/**
 * @BaseButton
 * @param {@} className
 * @param {@} size small |standard | larger
 * @param {@} variant primary | danger | warning | gray  => as style
 */

export const BaseButton = ({ className = '', variant = 'primary', size = 'standard', children, ...props }) => (
  <button className={ClassNames({ BaseButton: true, [className]: true, [variant]: true, [size]: true })} type="button" {...props}>
    {children}
  </button>
)
