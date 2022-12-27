import withMiddleware from 'library/api/withMiddleware'
import { getErc721BalancesFromApi } from 'services/api/erc721'

// get all token holders by address
const handler = async (req, res) => {
  const tokenAddress = req.query?.tokenAddress
  const query = {
    page: req.query.page,
    page_size: req.query.page_size,
  }
  try {
    const data = await getErc721BalancesFromApi(tokenAddress, query)
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
