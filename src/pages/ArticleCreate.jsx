import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function ArticleCreate() {
  const [titre, setTitre] = useState('');
  const [categorie, setCategorie] = useState('Architecture');
  const [contenu, setContenu] = useState('');
  const [erreur, setErreur] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement HTML du formulaire
    setErreur('');

    if (!titre.trim() || !contenu.trim()) {
      setErreur('Veuillez remplir le titre et le contenu.');
      return;
    }

    try {
      // DS1 attend { title, content } (et l'auteur est extrait du token JWT)
      // On envoie aussi categorie au cas où ton modèle ou contrôleur l'utilise
      await api.post('/articles', {
        title: titre,
        content: contenu,
        titre,
        categorie,
        contenu,
      });

      // Redirige instantanément vers la liste (qui rechargera les articles via GET)
      navigate('/articles');
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        setErreur(
          "Non autorisé (401) : connectez-vous d'abord sur /api/users/login pour enregistrer le token JWT."
        );
      } else {
        setErreur(
          err.response?.data?.message ||
            "Erreur lors de l'enregistrement de l'article sur le serveur."
        );
      }
    }
  };

  return (
    <div
      style={{
        maxWidth: '580px',
        margin: '0 auto',
        background: 'white',
        padding: '26px',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
      }}
    >
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '16px' }}>
        Publier un Nouvel Article
      </h2>
      {erreur && (
        <p
          style={{
            background: '#fef2f2',
            color: '#b91c1c',
            padding: '10px',
            borderRadius: '6px',
            marginBottom: '12px',
          }}
        >
          {erreur}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
      >
        <div>
          <label
            style={{
              display: 'block',
              fontWeight: 'bold',
              fontSize: '0.85rem',
              marginBottom: '4px',
            }}
          >
            Titre
          </label>
          <input
            type="text"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
            }}
          />
        </div>
        <div>
          <label
            style={{
              display: 'block',
              fontWeight: 'bold',
              fontSize: '0.85rem',
              marginBottom: '4px',
            }}
          >
            Categorie
          </label>
          <select
            value={categorie}
            onChange={(e) => setCategorie(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
            }}
          >
            <option value="Architecture">Architecture</option>
            <option value="Front-End">Front-End</option>
            <option value="Back-End">Back-End</option>
            <option value="Cybersecurite">Cybersecurite</option>
          </select>
        </div>
        <div>
          <label
            style={{
              display: 'block',
              fontWeight: 'bold',
              fontSize: '0.85rem',
              marginBottom: '4px',
            }}
          >
            Contenu
          </label>
          <textarea
            rows="4"
            value={contenu}
            onChange={(e) => setContenu(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
            }}
          />
        </div>
        <button type="submit" className="btn-primary">
          Enregistrer sur Express
        </button>
      </form>
    </div>
  );
}