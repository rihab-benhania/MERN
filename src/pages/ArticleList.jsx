import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const CATEGORIES = [
  'Tous',
  'Architecture',
  'Front-End',
  'Back-End',
  'Cybersecurite',
];

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // État local pour le filtre actif
  const [categorieActive, setCategorieActive] = useState('Tous');

  useEffect(() => {
    async function fetchArticles() {
      try {
        setLoading(true);
        setError(null);

        const res = await api.get('/articles');
        setArticles(Array.isArray(res.data) ? res.data : res.data.articles || []);
      } catch (err) {
        console.error(err);
        setError(
          err.response?.data?.message ||
            'Impossible de contacter le serveur Express (port 3000).'
        );
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  // Filtrage instantané en mémoire selon categorieActive
  const articlesFiltres = articles.filter((article) => {
    const catArticle = article.categorie || 'Architecture';
    if (categorieActive === 'Tous') return true;
    return catArticle === categorieActive;
  });

  if (loading) return <p>Chargement des articles...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
        }}
      >
        <h2>
          Catalogue des articles ({articlesFiltres.length} / {articles.length})
        </h2>

        <Link to="/nouveau" className="btn-primary">
          + Nouvel article
        </Link>
      </div>

      {/* Boutons de filtrage par catégorie */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            className="filter-btn"
            onClick={() => setCategorieActive(cat)}
            style={{
              fontWeight: categorieActive === cat ? '700' : '500',
              backgroundColor: categorieActive === cat ? '#2563eb' : 'white',
              color: categorieActive === cat ? 'white' : '#0f172a',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {articlesFiltres.length === 0 ? (
        <p>Aucun article dans la catégorie « {categorieActive} ».</p>
      ) : (
        <div className="card-grid">
          {articlesFiltres.map((article) => (
            <div className="card" key={article._id}>
              <span className="badge">{article.categorie || 'Architecture'}</span>
              <h3 style={{ marginTop: '8px' }}>{article.title}</h3>
              <p>{article.content}</p>
              <p>Auteur : {article.author?.name || 'Inconnu'}</p>
              <Link to={`/articles/${article._id}`}>Lire le détail →</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}