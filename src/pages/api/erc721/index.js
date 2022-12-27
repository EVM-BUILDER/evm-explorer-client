import withMiddleware from 'library/api/withMiddleware'
import { getAddressFromApi } from 'services/api/address'

const handler = async (req, res) => {
  try {
    // const data = await getAddressFromApi(req.query.address)
    const data = {
      test: 1,
    }
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
