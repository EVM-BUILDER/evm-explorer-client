import TokenUpdate from 'views/TokenUpdate'

function TokenUpdatePage() {
    return <TokenUpdate />
}

export async function getServerSideProps({ req, res }) {
    console.log(req)
    return
}

export default TokenUpdatePage
