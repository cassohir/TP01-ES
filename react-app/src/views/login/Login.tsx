
import { useState } from 'react';
import { useHistory } from 'react-router';

import './Login.css'
import { server } from '../../utils/config'

export default function Login() {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState< "none" | "block">("none");

  const history = useHistory();

  async function handleSubmit() {
    console.info('Enviando form');
    try {
      const response = await server.post('/login',{ email: email, password: password })
      if (response.data.status === 'success') {
          history.push('/filmes');
          window.location.reload();
      } else {
        throw new Error();
      }
      
    } catch (error) {
      setError("block");
      console.error(error);
      setTimeout(() => {
        setError("none");
      },2000)
    }
  }


  return (
    <div className="login">
      
          {/* <img src="/public/Movie.png"></img> */}
          <h1>Login</h1>
        
      <div className="form">
        <div className="line1">
          <input
            className="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>

        <div className="line2">
          <input
            className="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
          />
        </div>
         <p style={{display: error }}>Usuário e/ou Senha incorretos!</p>
          <div>
            <button onClick={handleSubmit} className="submit">
              Entrar
            </button>
          </div>
      </div>
      
        <div className="register">
          <h3>
            Não tem uma conta ainda? <a href="/register">Cadastre-se</a>
          </h3>
        </div>
    </div>
  )
}