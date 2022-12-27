import RegisterView from 'views/Auth/pages/Register'
import { getBody } from 'utils/bodyParser'
import { registerRequestApi } from 'services/api/auth'

function Register(props) {
  return <RegisterView {...props} />
}

export async function getServerSideProps({ req, res }) {
  let resRegister = null

  if (req.method === 'POST') {
    await getBody(req, res)

    const body = req.body

    try {
      resRegister = await registerRequestApi(body)
      if (resRegister?.message === 'success') {
        res.writeHead(301, { Location: '/login' })
        res.end()
        return true
      }
    } catch (error) {
      resRegister = {
        status: false,
        data: error?.response,
        message: error?.message,
      }
    }
  }

  return {
    props: {
      resRegister,
    },
  }
}

export default Register
