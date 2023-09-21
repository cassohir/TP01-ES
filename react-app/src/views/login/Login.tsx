import React, { useState } from 'react';
import './Login.css';
import { Button } from '@mui/material';
import Link from '@mui/material/Link';

interface LoginState {
  username: string;
  password: string;
}

const initialLoginState: LoginState = {
  username: '',
  password: '',
};

const Login: React.FC = () => {
  const [loginData, setLoginData] = useState<LoginState>(initialLoginState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica de autenticação
    console.log('Dados de login:', loginData);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Nome de usuário:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={loginData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              required
            />
          </div>
          <Button variant="contained">Login</Button>
        </form>
        <div>
            <p>Nao tem conta? 
            <Link href="/register">Registre-se</Link>
            </p>
        </div>
      </div>
    </div>
  );
};

export default Login;