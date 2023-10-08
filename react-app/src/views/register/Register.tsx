import { NavLink } from 'react-router-dom'; import { useState } from 'react';
import { useHistory } from 'react-router';
import { server } from '../../utils/config';

import Arrow from '../../assets/arrow.png'

import './Register.css'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState<"none" | "block">("none");
  const [errorMessage, setErrorMessage] = useState<string>("Os dados não conferem");

  const history = useHistory()

  const blinkError = (error: string | null | unknown) => {
    if (error) setErrorMessage(error as string);
    setError("block");
      console.error(error);
      setTimeout(() => {
        setError("none");
      },2000)

  }

  async function handleSubmit() {
    console.info('Registrando usuário');
    if (passwordConfirmation !== password) {
      blinkError("As senhas não são iguais!");
      return;
    }
    try {
      const response = await server.post('/user', { name: name, email: email, password: password });
      if (response.data.status === 'success') {
        history.push('/');
        window.alert("Usuário criado com sucesso!");
        window.location.reload();
      } else {
        console.info('TESSTE 1');
        console.log(response.data);
        
        throw new Error();
      }
      
    } catch (error) {
      const errorMessage = error?.response.data.message; 
      blinkError(errorMessage);
    }
  }

  return (
    <div className="register">
      <div className="arrow">
        <NavLink to="/">
          <img src={Arrow} alt="Voltar" />
        </NavLink>
      </div>
      <div className="form">
        <div className="title">
          <h1>Cadastro</h1>
        </div>

        <div className="line1">
          <input
            className="name"
            type="text"
            placeholder="Nome"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="email"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="line2">
          <input
            className="password"
            type="password"
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="repassword"
            type="password"
            placeholder="Repetir Senha"
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          
        </div>
          <p style={{display: error }}>{ errorMessage  }</p>
          <button onClick={handleSubmit} type="submit" className="submit">
            Registrar
          </button>
      </div>
    </div>
  )
}