import React from 'react'
import styled from 'styled-components'

const InputStyled = styled.div`
  width: 100%;
  position: relative;
  .winput {
    color: var(--text);
    line-height: 1.5;
    width: 100%;
    height: 36px;
    padding: 0.375rem 0.75rem;
    background-color: #fff;
    background-clip: padding-box;
    border: ${({ error }) => (error ? '1px solid red' : '1px solid var(--border-color)')};
    border-radius: 4px;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    display: flex;
    align-items: center;
    &:hover,
    &:focus {
      border: ${({ error }) => (error ? '1px solid red' : '1px solid #ced4da')};
    }
    input {
      width: 100%;
      border: unset;
      &:hover,
      &:focus {
        border: unset;
        outline: unset;
      }
    }
  }
`

export const InputText = ({ name, onChange, onTouched, onBlur, placeholder, error, ...props }) => {
  return (
    <InputStyled error={error}>
      <div className="winput">
        {props.prefix}
        <input
          id={name}
          type="text"
          onChange={(e) => onChange?.(e.target.value)}
          onBlur={(e) => {
            const value = e.target.value
            setTimeout(() => {
              onTouched?.()
              if (onBlur) onBlur(value)
            }, 500)
          }}
          // value={value || ''}
          placeholder={placeholder ? placeholder : ''}
        />
        {props.suffix}
      </div>
    </InputStyled>
  )
}
