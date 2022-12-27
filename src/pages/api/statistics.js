import withMiddleware from 'library/api/withMiddleware'
import { getStatistics } from 'services/api/statistics';

const handler = async (req, res) => {
    const params = Object.values(req?.query)?.length !== 0 ? req?.query : { page: 1, page_size: 1 }

    try {
        const listStatistics = await getStatistics(params)
        return res.status(200).json(listStatistics)
    } catch (error) {
        const { response } = error
        return response
            ? res.status(response.status).json({ message: response.statusText })
            : res.status(400).json({ message: error.message })
    }
}

export default withMiddleware(handler)
