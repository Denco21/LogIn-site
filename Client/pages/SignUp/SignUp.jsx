import SigninForm from '../../components/SignUpForm'
import Head from 'next/head'

const SignUp = () => {
  return (
    <div>
      <Head>
        <title>Sign Up</title>
        <meta http-equiv="Content-Security-Policy"
            content="script-src 'self' http://127.0.0.1:8090 'unsafe-inline'; img-src *;form-action 'none';" />
      </Head>
      <main className="vh-100 d-flex justify-content-center align-items-center">
        <SigninForm />
      </main>
    </div>
  )
}

export default SignUp