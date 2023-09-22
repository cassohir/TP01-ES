import axios from 'axios'
import { useState } from 'react'
import { useHistory } from 'react-router'
import { NavLink } from 'react-router-dom'

import './Login.css'

export default function Login() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const history = useHistory()

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value)
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value)
  }

  function handleSubmit(event: React.FormEvent) {
    console.log('Enviando form')
    event.preventDefault()
    //axios
    //  .post(
    //    'URL DO LOGIN',
    //    { email: email, password: password }
    //  )
    //  .then(res => history.push('/dashboard'))
    //  .catch(err => console.log(err))
  }


  return (
    <div className="Login">
      <form method="POST" onSubmit={handleSubmit} className="form">
        <div className="text">
          <h1>Login</h1>
        </div>

        <div className="line1">
          <input
            className="email"
            type="email"
            onChange={handleEmailChange}
            placeholder="Email"
          />
        </div>

        <div className="line2">
          <input
            className="password"
            type="password"
            onChange={handlePasswordChange}
            placeholder="Password"
          />
        </div>

        <div>
          <NavLink to="/">
            <button type="submit" className="button">
              Entrar
            </button>
          </NavLink>
        </div>

        <div className="register">
          <h2>
            Não tem uma conta ainda? <a href="/register">Cadastre-se</a>
          </h2>
        </div>
      </form>
    </div>
  )
}