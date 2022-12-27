import withMiddleware from 'library/api/withMiddleware'
import { getErc20HoldersFromApi } from 'services/api/erc20'

// get all token holders by address
const handler = async (req, res) => {
  const tokenAddress = req.query?.tokenAddress
  const query = {
    page: req.query.page,
    page_size: req.query.page_size,
  }
  try {
    const data = await getErc20HoldersFromApi(tokenAddress, query)
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
