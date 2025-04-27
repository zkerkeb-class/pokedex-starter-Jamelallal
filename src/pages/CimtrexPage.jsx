// src/pages/CimtrexPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css';
import ghost1 from '../assets/ghost1.png';
import ghost2 from '../assets/ghost2.png';

function CimtrexPage() {
  const [deletedPokemons, setDeletedPokemons] = useState([]);
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('deletedPokemons');
    if (saved) {
      setDeletedPokemons(JSON.parse(saved));
    }
  }, []);

  const toggleSelect = (pokemon) => {
    if (selected.includes(pokemon)) {
      setSelected(selected.filter(p => p !== pokemon));
    } else if (selected.length < 3) {
      setSelected([...selected, pokemon]);
    }
  };

  const handleResurrect = () => {
    if (selected.length !== 3) return alert("Choisis exactement 3 Pokémon pour ressusciter !");

    const ghostImages = [ghost1, ghost2];
    const randomGhost = ghostImages[Math.floor(Math.random() * ghostImages.length)];

    const combinedPokemon = {
      id: Math.floor(Math.random() * 100000),
      name: { english: 'Spectrex' },
      types: Array.from(new Set(selected.flatMap(p => p.types || []))),
      stats: {
        hp: Math.floor(selected.reduce((sum, p) => sum + (p.stats?.hp || 0), 0) / 3),
        attack: Math.floor(selected.reduce((sum, p) => sum + (p.stats?.attack || 0), 0) / 3),
        defense: Math.floor(selected.reduce((sum, p) => sum + (p.stats?.defense || 0), 0) / 3),
        speed: Math.floor(selected.reduce((sum, p) => sum + (p.stats?.speed || 0), 0) / 3),
      },
      image: randomGhost,
      isResurrected: true,
    };

    const resurrected = JSON.parse(localStorage.getItem('resurrectedPokemons')) || [];
    resurrected.push(combinedPokemon);
    localStorage.setItem('resurrectedPokemons', JSON.stringify(resurrected));

    alert("Un Pokémon Spectral est né !");
    navigate('/');
  };

  if (deletedPokemons.length === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px', color: 'white' }}>
        <h2>Aucun Pokémon dans le cimetière.</h2>
        <Link to="/" style={{ marginTop: '20px', display: 'inline-block', color: '#ccc', textDecoration: 'none', fontWeight: 'bold' }}>
          Retour à l'accueil
        </Link>
      </div>
    );
  }

  return (
    <div style={{ background: '#0e0e0e', minHeight: '100vh', padding: '40px', color: 'white' }}>
      {/* Bannière Fantôme */}
      <div style={{ textAlign: 'center', marginBottom: '40px', background: 'linear-gradient(90deg, #880e4f, #0e0e0e)', padding: '30px', borderRadius: '12px', boxShadow: '0 0 20px #ff1744' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#ffebee' }}>Cimtrex Pokédex - Spectrex Resurrection</h1>
        <p style={{ fontSize: '1.2rem', color: '#ffcdd2' }}>Bienvenue au Cimtrex Pokédex...
Là où reposent les âmes perdues des Pokémon.

Sélectionne trois esprits défunts pour invoquer une créature oubliée...
Mais prends garde : leurs forces et faiblesses seront fusionnées par les caprices du destin.

Ta création pourra être une légende... ou une malédiction.

Oseras-tu défier la mort ?</p>
      </div>

      {/* Cartes */}
      <div className="pokemon-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {deletedPokemons.map((pokemon) => (
          <div
            key={pokemon.id}
            className="pokemon-card"
            onClick={() => toggleSelect(pokemon)}
            style={{
              cursor: 'pointer',
              border: selected.includes(pokemon) ? '3px solid #ff1744' : '2px solid #333',
              background: '#1a1a1a',
              boxShadow: selected.includes(pokemon) ? '0 0 20px #ff1744' : '0 0 10px #880e4f',
              transition: '0.3s',
              animation: selected.includes(pokemon) ? 'flame 0.7s infinite alternate' : 'none'
            }}
          >
            <div className="pokemon-image-container">
              <img
                src={pokemon.image || `/assets/pokemons/${pokemon.id}.png`}
                alt={pokemon.name?.english || 'Pokémon'}
                className="pokemon-image"
              />
            </div>
            <h3 className="pokemon-name" style={{ color: '#ff5252' }}>{pokemon.name?.english}</h3>
            <div className="pokemon-type" style={{ marginBottom: '6px' }}>
              {(pokemon.types || []).join(', ')}
            </div>
            <div className="pokemon-stats" style={{ fontSize: '12px', color: '#bbb' }}>
              <p>HP: {pokemon.stats?.hp}</p>
              <p>Attack: {pokemon.stats?.attack}</p>
              <p>Defense: {pokemon.stats?.defense}</p>
              <p>Speed: {pokemon.stats?.speed}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bouton Ressusciter */}
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button
          onClick={handleResurrect}
          style={{
            padding: '12px 30px',
            backgroundColor: selected.length === 3 ? '#ff1744' : '#555',
            color: 'white',
            border: '2px solid red',
            borderRadius: '8px',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: selected.length === 3 ? 'pointer' : 'not-allowed',
            transition: '0.3s',
          }}
          disabled={selected.length !== 3}
        >
          RESSUSCITER ⚡
        </button>
        <div style={{ marginTop: '20px' }}>
          <Link to="/" style={{ padding: '10px 20px', backgroundColor: '#444', color: 'white', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold' }}>
            Retour
          </Link>
        </div>
      </div>

      {/* Animation Flame */}
      <style>
        {`
          @keyframes flame {
            0% { box-shadow: 0 0 10px #ff1744; }
            100% { box-shadow: 0 0 20px #ff1744; }
          }
        `}
      </style>
    </div>
  );
}

export default CimtrexPage;
