import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erreur, setErreur] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur('');

    try {
      const res = await api.post('/users/login', { email, password });
      // On sauvegarde le token dans le navigateur
      localStorage.setItem('token', res.data.token);
      // On va sur la page de création d'article
      navigate('/nouveau');
    } catch (err) {
      setErreur(err.response?.data?.message || 'Email ou mot de passe incorrect');
    }
  };

  return (
    <div style={{ maxWidth: '420px', margin: '0 auto', background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '16px' }}>Se connecter</h2>

      {erreur && (
        <p style={{ background: '#fef2f2', color: '#b91c1c', padding: '10px', borderRadius: '6px', marginBottom: '12px' }}>
          {erreur}
        </p>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input
          type="email"
          placeholder="Ton email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
        />
        <input
          type="password"
          placeholder="Ton mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
        />
        <button type="submit" className="btn-primary">Connexion</button>
      </form>
    </div>
  );
}