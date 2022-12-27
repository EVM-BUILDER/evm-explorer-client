const { ABI_TYPE } = require('redux/constants')

export function getContractResult(type, result) {
  let text = ''
  switch (type) {
    case ABI_TYPE.address:
      return text
    case ABI_TYPE.string:
      return <span>{result}</span>
    case ABI_TYPE.bool:
      return <span>{result}</span>
    case ABI_TYPE.uint256:
      return <span>{result?.toString()}</span>
    case ABI_TYPE.uint8:
      return <span>{result}</span>
    default:
      return <span>{JSON.stringify(result)}</span>
  }
}
