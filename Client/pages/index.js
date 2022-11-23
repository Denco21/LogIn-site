import Head from 'next/head'
import styles from '../styles/Home.module.css'
import LoginForm from '../components/LogInForm'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Login Page</title>
        <meta http-equiv="Content-Security-Policy"
            content="script-src 'self' http://127.0.0.1:8090 'unsafe-inline'; img-src *; form-action 'none';" />
      </Head>
      <main className="vh-100 d-flex justify-content-center align-items-center">
        <LoginForm />
      </main>
    </div>
  )
}
