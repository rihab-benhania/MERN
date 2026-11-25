import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

export default function ArticleDetail() {
  //Récupère l'ID dynamique depuis l'URL (/articles/:id)
  const { id } = useParams();

  //Hook de navigation pour rediriger par code après suppression
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function fetchArticle() {
      try {
        setLoading(true);
        setError(null);
        // GET /api/articles/:id sur backend DS1
        const res = await api.get(`/articles/${id}`);
        setArticle(res.data);
      } catch (err) {
        console.error(err);
        setError(
          err.response?.data?.message || 'Impossible de récupérer cet article.'
        );
      } finally {
        setLoading(false);
      }
    }

    fetchArticle();
  }, [id]);

  // Fonction déclenchée au clic sur "Supprimer"
  const handleDelete = async () => {
    try {
      setDeleting(true);
      setError(null);

      // Envoie DELETE /api/articles/:id (avec header Authorization: Bearer <token> via api.js)
      await api.delete(`/articles/${id}`);

      // Redirection SPA immédiate vers le catalogue mis à jour
      navigate('/articles');
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          'Suppression refusée (vérifiez votre connexion JWT ou vos droits).'
      );
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error && !article) return <p style={{ color: 'red' }}>{error}</p>;
  if (!article) return <p>Article introuvable.</p>;

  return (
    <article className="card">
      <h1>{article.title}</h1>
      <p>{article.content}</p>
      <p>Auteur : {article.author?.name || 'Inconnu'}</p>

      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

      <div style={{ display: 'flex', gap: '12px', marginTop: '16px', alignItems: 'center' }}>
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          style={{
            padding: '8px 14px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#dc2626',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          {deleting ? 'Suppression...' : 'Supprimer'}
        </button>

        <Link to="/articles">← Retour à la liste</Link>
      </div>
    </article>
  );
}