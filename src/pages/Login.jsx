import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { H1 } from '../components/Typography';
import { supabase } from '../config/supabase';

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const LoginForm = styled(motion.form)`
  width: 100%;
  max-width: 400px;
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: var(--color-text);
  font-size: var(--font-size-sm);

  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }
`;

const Button = styled(motion.button)`
  width: 100%;
  padding: 0.75rem;
  background: var(--color-primary);
  border: none;
  border-radius: 8px;
  color: black;
  font-weight: 500;
  cursor: pointer;
`;

const ErrorMessage = styled.div`
  color: #ff4444;
  margin-bottom: 1rem;
  font-size: var(--font-size-sm);
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const testConnection = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('count')
        .single();

      if (error) throw error;
      console.log('Database connection successful:', data);
    } catch (err) {
      console.error('Database connection error:', err);
    }
  };

  useEffect(() => {
    testConnection();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      console.log('Attempting login with:', email);
      const { data, error } = await login(email, password);
      
      if (error) {
        console.error('Login error:', error);
        throw error;
      }
      
      console.log('Login successful:', data);
      navigate('/admin/orders');
    } catch (err) {
      setError('Failed to sign in: ' + err.message);
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginForm
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <H1 align="center" style={{ marginBottom: '2rem' }}>Admin Login</H1>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <Button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
