import { googleAPiKey } from 'config/constants';
import withMiddleware from 'library/api/withMiddleware'

const handler = async (req, res) => {
    try {
        const listGoogleFont = await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${googleAPiKey}`)
        const data = await listGoogleFont.json();
        return res.status(200).json(data)
    } catch (error) {
        const { response } = error
        return response
            ? res.status(response.status).json({ message: response.statusText })
            : res.status(400).json({ message: error.message })
    }
}

export default withMiddleware(handler)