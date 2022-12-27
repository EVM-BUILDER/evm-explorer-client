import withMiddleware from 'library/api/withMiddleware'
import { getErc20TransfersFromApi } from 'services/api/erc20'

// get all token holders by address
const handler = async (req, res) => {
  try {
    const data = await getErc20TransfersFromApi(req.query)
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
