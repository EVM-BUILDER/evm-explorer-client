import React from 'react'
import styled from 'styled-components'
import { Space, Spin } from 'antd'
import { Form, FormItem } from 'components/Form'
import ReviewType from './ReviewType'
import ResultType from './ResultType'
import Dots from 'components/Loader/Dots'
import { ABI_ACTION_TYPE } from 'redux/constants'

const ResultFormStyled = styled.div`
  .contract_result_action {
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;
    white-space: nowrap;

    padding: 0.375rem 0.75rem;
    display: inline-block;
    text-align: center;
    vertical-align: middle;

    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
      box-shadow 0.15s ease-in-out;
    cursor: pointer;
    user-select: none;
    &.read {
      color: #212529;
      margin-bottom: 10px;
      background-color: #f8f9fa;
      border: 1px solid #dee2e6;
    }
    &.write {
      color: var(--tertiary);
      margin-bottom: 0;
      background-color: var(--primary);
      border: 1px solid var(--primary);
    }
  }
  .form_read_result {
    .form_read_result_type {
      color: #6c757d;
    }
  }
`

const ResultForm = ({ abi, type, address, onSubmit, result }) => {
  const handleSubmitForm = (e) => {
    e.preventDefault()
    const form = {}
    const errorField = {}
    Array.from(e.target).forEach((child) => {
      const key = child.name.split(' ')[0]
      const value = child.value
      if (!key) return
      if (value === '' || value === undefined || value === null) {
        errorField[key] = 'Required'
      }
      form[key] = value
    })
    if (Object.values(errorField).length > 0) return
    onSubmit?.(form)
  }

  return (
    <ResultFormStyled>
      {/* {JSON.stringify(result)} */}
      <Form onSubmit={handleSubmitForm}>
        {abi.inputs?.map((input) => {
          return (
            <FormItem
              key={`${input.name}-${input.type}`}
              name={input.name}
              label={`${input.name || '<input> '} (${input.type})`}
              placeholder={`${input.name || '<input> '} (${input.type})`}
            />
          )
        })}

        {type === ABI_ACTION_TYPE.read && (
          <button className="contract_result_action read" type="submit" value="Submit">
            Query{result?.loading && <Dots />}
          </button>
        )}

        {type === ABI_ACTION_TYPE.write && (
          <Space align="start">
            <button className="contract_result_action write" type="submit" value="Submit">
              Write{result?.loading && <Dots />}
            </button>
            {result?.status === true && (
              <a
                className="contract_result_action write"
                href={`/tx/${result?.data?.hash}`}
                target="_blank"
                rel="noreferrer"
              >
                View your transaction
              </a>
            )}
            {result?.status === false && (
              <p className="text-error" style={{ textTransform: 'capitalize' }}>
                {result?.error?.message || ''}
              </p>
            )}
          </Space>
        )}
      </Form>

      {type === ABI_ACTION_TYPE.read && (
        <div className="form_read_result">
          <div className="form_read_result_success text-span">
            <ReviewType outputs={abi.outputs} />

            {result?.status === true && <ResultType address={address} abi={abi} result={result?.data} />}

            {result?.status === false && (
              <p className="text-error" style={{ textTransform: 'capitalize' }}>
                {result?.error?.message || 'Error'}
              </p>
            )}
          </div>
        </div>
      )}
    </ResultFormStyled>
  )
}

export default ResultForm
