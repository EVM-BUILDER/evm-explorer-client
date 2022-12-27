import ReactTimeAgo from 'react-time-ago'
import { isNumber } from 'library/helpers/Number'

const FormatTimeAgo = ({ value, nullValue, ...props }) => {
  if (!isNumber(value)) {
    return <>{nullValue}</>
  }

  return <ReactTimeAgo date={value} locale="en-US" timeStyle="round" {...props} />
}

export default FormatTimeAgo
