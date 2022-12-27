import withMiddleware from 'library/api/withMiddleware'
import { getAddressDetailFromApi } from 'services/api/address'

// get address detail by address
const handler = async (req, res) => {
  try {
    const data = await getAddressDetailFromApi(req.query.address)
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
