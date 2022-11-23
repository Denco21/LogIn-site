import Head from 'next/head'
import { Link } from '../components/Link'
import Cookies from "js-cookie"

const Admin = () => {


  const logout = () => {
    Cookies.remove("LoggedIn")
    Cookies.remove("AdminLoggedIn")
  }
  return (
    <div>
      <Head>
        <title>Admin</title>
        <meta http-equiv="Content-Security-Policy" />
      </Head>
      <main>
        <h1  className='text-3xl font-bold text-black-500 mb-5'>Admin Page</h1>
        <a
          type='submit'
          href="/"
          className='border-2 border-green-500 text-green-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-green-500 hover:text-white'
          onClick={() => logout()}
        >
          LogOut
        </a>
      </main>
    </div>
  )
}

export default Admin