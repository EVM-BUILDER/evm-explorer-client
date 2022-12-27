import React from 'react'
import styled from 'styled-components'

const InputStyled = styled.div`
  width: 100%;
  position: relative;
  input {
    color: #495057;
    line-height: 1.5;
    width: 100%;
    height: 32px;
    padding: 0.375rem 0.75rem;
    background-color: #fff;
    background-clip: padding-box;
    border: ${({ error }) => (error ? '1px solid red' : '1px solid #ced4da')};
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    display: block;

    &:hover,
    &:focus {
      border: ${({ error }) => (error ? '1px solid red' : '1px solid #ced4da')};
      outline: unset;
    }
  }
  .input_error {
    font-size: 13px;
    color: red;

    position: absolute;
    top: 102%;
    left: 0;
  }
`

const Input = ({ rightInput, errorMess, containerProps, ...props }) => {
  return (
    <InputStyled error={errorMess} {...containerProps}>
      <input {...props} />
      {errorMess && <div className="input_error">{errorMess}</div>}
    </InputStyled>
  )
}

export default Input
