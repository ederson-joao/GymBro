import React, { useState } from 'react';
import { supabase } from '../services/supabase.ts'; // Importe o cliente do Supabase
import { useNavigate } from 'react-router-dom';
import './Signup.css'; // Estilos específicos para a página de cadastro

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Estado para controlar o carregamento
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Ativa o estado de carregamento
    setError(null); // Limpa erros anteriores

    // Validação de senha
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      setLoading(false);
      return;
    }

    try {
      // Verifica se o email já está cadastrado
      const { data: existingUsers, error: fetchError } = await supabase
        .from('users')
        .select('email')
        .eq('email', email);

      if (fetchError) {
        setError('Erro ao verificar email. Tente novamente.');
        return;
      }

      if (existingUsers && existingUsers.length > 0) {
        setError('Este email já está cadastrado.');
        return;
      }

      // Cadastra o usuário no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: 'http://localhost:3000/login', // URL de redirecionamento após confirmação
        },
      });

      if (authError) {
        setError(authError.message);
        return;
      }

      if (authData.user) {
        // Insere o usuário na tabela `users`
        const { error: userError } = await supabase
          .from('users')
          .insert([{ id: authData.user.id, email, is_onboarded: false }]);

        if (userError) {
          setError(userError.message);
          return;
        }

        // Redireciona para a página de login após o cadastro bem-sucedido
        navigate('/login');
      }
    } catch (err) {
      setError('Erro ao cadastrar. Tente novamente.'); // Exibe um erro genérico
    } finally {
      setLoading(false); // Desativa o estado de carregamento
    }
  };

  return (
    <div className="signup">
      <img src="./images/gymbro.png" alt="GymBro" />
      <form onSubmit={handleSignup} className="signup-form">
        <h2>Cadastro</h2>
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
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirme a Senha</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
        <p>
          Já tem uma conta? <a href="/login">Faça login</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;