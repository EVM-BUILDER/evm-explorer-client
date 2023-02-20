import { useSelector } from 'react-redux'
import get from "lodash/get"

function useNativeToken() {
  const { settings } = useSelector((state) => state.Settings)
  return get(settings, "chain.native", {})
}
export default useNativeToken
