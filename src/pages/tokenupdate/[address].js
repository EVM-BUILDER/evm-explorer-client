import TokenUpdateAddress from 'views/TokenUpdateAddress'
import { checkLogin } from 'utils/auth'

function TokenUpdateAddressPage() {
    return <TokenUpdateAddress />
}

export async function getServerSideProps({ req, res }) {
    return checkLogin(req, res)
}

export default TokenUpdateAddressPage
