import LoginView from 'views/Auth/pages/Login'
// import { getBody } from 'utils/bodyParser'
// import { loginRequestApi } from 'services/api/auth'

function Login(props) {
  return <LoginView {...props} />
}

// export async function getServerSideProps({ req, res }) {
//   let resLogin = null

//   if (req.method === 'POST') {
//     await getBody(req, res)

//     const body = req.body

//     try {
//       resLogin = await loginRequestApi(body)
//       if (resLogin?.message === 'success') {
//         res.writeHead(301, { Location: '/myaccount' })
//         res.end()
//         return true
//       }
//     } catch (error) {
//       resLogin = {
//         status: false,
//         data: error?.response || null,
//         message: error?.message || '',
//       }
//     }
//   }

//   return {
//     props: {
//       resLogin,
//     },
//   }
// }

export default Login
