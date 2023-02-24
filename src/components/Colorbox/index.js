import React from 'react'
import { Colorpicker } from 'antd-colorpicker'
import { Input } from 'antd'

const Colorbox = ({value, onChange}) => {
  return (
    <div className='colorbox-wrapper'>
      <Colorpicker popup value={value} onChange={onChange} onColorResult={(color) => color.rgb.a === 1 ? color.hex : `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`} />
      <Input value={value} onChange={onChange} />
    </div>
  )
}

export default Colorbox
