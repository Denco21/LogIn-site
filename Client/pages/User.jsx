import Head from 'next/head'
import Cookies from "js-cookie"

const User = () => {

  const logout = () => {
    Cookies.remove("LoggedIn")
    Cookies.remove("UserLoggedIn")
  }
  return (
    <div>
      <Head>
        <title>User</title>
        <link rel="icon" />
        <meta http-equiv="Content-Security-Policy" />
      </Head>
      <main>
        <h1  className='text-3xl font-bold text-black-500 mb-5'>User Page</h1>
        <a
          type='submit'
          href="/"
          onClick={() => logout()}
          className='border-2 border-green-500 text-green-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-green-500 hover:text-white'
        >
          LogOut
        </a>
      </main>
    </div>
  )
}

export default User