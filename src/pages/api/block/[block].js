import withMiddleware from 'library/api/withMiddleware'
import { getBlockDetail } from 'services/api/blocks'

const handler = async (req, res) => {
    try {
        const data = await getBlockDetail(req?.query?.block || "")
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
