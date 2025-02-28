import React, { useState } from 'react';
import { supabase } from '../services/supabase.ts';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        navigate('/dashboard'); // Redireciona para a página inicial após o login
      }
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.');
    }
  };

  return (
    <div className='login'>
      <img src="./images/gymbro.png" alt="GymBro" />
    <form onSubmit={handleLogin} className="login-form">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Entrar</button>
      <p>
        Não tem uma conta? <a href="/signup">Cadastre-se</a>
      </p>
    </form>
    </div>
  );
};

export default Login;