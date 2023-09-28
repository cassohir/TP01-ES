import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { useHistory } from 'react-router'

import Arrow from '../../assets/arrow.png'

import './Register.css'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const history = useHistory()

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value)
  }

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value)
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value)
  }

  function handlePasswordConfirmationChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPasswordConfirmation(event.target.value)
  }

  function handleSubmit(event: React.FormEvent) {
    console.log('Enviar formulario')
    event.preventDefault()
    //axios
    //  .post('URL DO REGISTRO AQUI', {
    //    name: name,
    //    email: email,
    //    password: password,
    //    passwordConfirmation: passwordConfirmation
    //  })
    //  .then(res => history.push('/'))
    //  .catch(err => console.log(err))
  }

  return (
    <div className="Register">
      <div className="arrow">
        <NavLink to="/">
          <img src={Arrow} alt="Voltar" />
        </NavLink>
      </div>
      <form method="POST" onSubmit={handleSubmit} className="form">
        <div className="title">
          <h1>Cadastro</h1>
        </div>

        <div className="line1">
          <input
            className="name"
            type="text"
            placeholder="Nome"
            onChange={handleNameChange}
          />
          <input
            className="email"
            type="email"
            placeholder="Email"
            onChange={handleEmailChange}
          />
        </div>

        <div className="line2">
          <input
            className="password"
            type="password"
            placeholder="Senha"
            onChange={handlePasswordChange}
          />
          <input
            className="repassword"
            type="password"
            placeholder="Repetir Senha"
            onChange={handlePasswordConfirmationChange}
          />
        </div>
        <NavLink to="/">
          <button type="submit" className="button">
            Confirmar
          </button>
        </NavLink>
      </form>
    </div>
  )
}