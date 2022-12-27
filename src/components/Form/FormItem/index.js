import Input from 'components/Input'
import React from 'react'
import styled from 'styled-components'

const FormItemStyled = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  .form_item_label {
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
    & > label {
    }
    & > .form_item_label_right {
    }
  }
`

const FormItem = ({ name, label, rightLabel, ...props }) => {
  return (
    <FormItemStyled>
      {(label || rightLabel) && (
        <div className="form_item_label">
          {label && <label htmlFor={name}>{label}</label>}
          {rightLabel && <div className="form_item_label_right">{rightLabel}</div>}
        </div>
      )}
      <Input type="text" id={name} name={label} {...props} />
    </FormItemStyled>
  )
}

export default FormItem
