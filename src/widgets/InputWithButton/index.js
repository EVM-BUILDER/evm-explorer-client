import React from 'react'

const InputWithButton = ({ placeholder, button, size, ...props }) => (
  <div className="box-input" data-size={size || 'standard'} {...props}>
    <input placeholder={placeholder} />
    <button type="button" className="btn-primary">
      {button}
    </button>
  </div>
)

export default InputWithButton
