import withMiddleware from 'library/api/withMiddleware'
import { getTransactionDetail } from 'services/api/transactions'

const handler = async (req, res) => {
    try {
        const data = await getTransactionDetail(req?.query?.txHash || "")
        res.status(200).send(JSON.stringify(data))
    } catch (error) {
        res.status(401).send(
            JSON.stringify({
                data: error,
                message: error?.message,
            }),
        )
    }
}

export default withMiddleware(handler)
