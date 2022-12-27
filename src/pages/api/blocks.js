import withMiddleware from 'library/api/withMiddleware'
import { getListBlocks } from 'services/api/blocks';

const handler = async (req, res) => {
    const params = Object.values(req?.query)?.length !== 0 ? req?.query : { page: 1, page_size: 25 }

    try {
        const listBlocks = await getListBlocks(params)
        return res.status(200).json(listBlocks)
    } catch (error) {
        const { response } = error
        return response
            ? res.status(response.status).json({ message: response.statusText })
            : res.status(400).json({ message: error.message })
    }
}

export default withMiddleware(handler)