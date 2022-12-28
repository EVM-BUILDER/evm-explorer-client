import React, { FC, Fragment } from 'react'
import styled from 'styled-components'
import { ClassNames } from 'utils/classNames.util'
import { ObjectUtils } from 'utils/object.utils'

const InputWrapperStyled = styled.div`
  .errorMessage {
    color: red;
    font-size: 12px;
  }
`

export const InputWrapper = (props) => {
  const { error, isDisabled, name, locales, value, label, description, showMessage = true } = props.inputProps

  const isMutilLocale = props.inputProps.isMutilLocale && locales && locales.length > 0
  const inputProps = {
    ...props.inputProps,
    value,
    label: label || props.label,
    description: description || props.description,
  }

  if (props.isVisible === false) return null

  return (
    <InputWrapperStyled
      id={name}
      className={ClassNames({
        InputWrapper: true,
        hasValue: !!value,
        error: !!error,
        disabled: !!isDisabled,
        mutilLocale: isMutilLocale,
        [props.className]: !!props.className,
        required: !!props.isRequired,
      })}
    >
      {inputProps.label ? (
        <div className="label">
          <span>{inputProps.label}</span>
        </div>
      ) : null}

      {inputProps.description ? <div className="description">{inputProps.description}</div> : null}

      {(() => {
        if (isMutilLocale && locales) {
          const generalErrorMessage = typeof error === 'string' ? error : ''
          return (
            <Fragment>
              {locales
                .filter((v) => v.isActive)
                .map((locale, key) => {
                  const errorMessage = ObjectUtils.getIn(error, locale.key)

                  return (
                    <div
                      key={key}
                      className={ClassNames({
                        wraper: true,
                        hasError: !!errorMessage,
                      })}
                    >
                      <div className="input">
                        <div className="localeLabel">{locale.label}</div>
                        {(() => {
                          const mutilInputProps = {
                            ...inputProps,
                            value: ObjectUtils.getIn(props.inputProps, `value.${locale.key}`),
                            defaultValue: ObjectUtils.getIn(props.inputProps, `defaultValue.${locale.key}`),
                            onChange: (e) =>
                              inputProps.onChange({
                                ...value,
                                [locale.key]: e,
                              }),
                          }

                          if (props.component) return <props.component {...mutilInputProps} />
                          if (props.renderInput) return props.renderInput(mutilInputProps)
                        })()}
                      </div>

                      {errorMessage ? <div className="errorMessage">{errorMessage.toString()}</div> : null}
                    </div>
                  )
                })}

              {generalErrorMessage ? <div className="generalErrorMessage">{generalErrorMessage.toString()}</div> : null}
            </Fragment>
          )
        }

        return (
          <div
            className={ClassNames({
              wraper: true,
              hasError: !!error,
            })}
          >
            <div className="input">
              {(() => {
                if (props.component) return <props.component {...inputProps} />
                if (props.renderInput) return props.renderInput(inputProps)
              })()}
            </div>
            {error && showMessage ? <div className="errorMessage">{error.toString()}</div> : null}
          </div>
        )
      })()}
    </InputWrapperStyled>
  )
}
