import CurrencyFormat from 'react-currency-format'
import { isNumber, withNoExponents } from 'library/helpers/Number'

const FormatAmount = ({ value, nullValue, prefix, suffix, ...props }) => {
  if (!isNumber(value)) {
    return (
      <>
        {prefix}
        {nullValue}
        {suffix}
      </>
    )
  }

  if (value < 1)
    return (
      <>
        {prefix}
        {withNoExponents(value)}
        {suffix}
      </>
    )
  return (
    <CurrencyFormat
      value={value}
      displayType="text"
      thousandSeparator
      renderText={(v) => v}
      prefix={prefix}
      suffix={suffix}
      {...props}
    />
  )
}

export default FormatAmount
