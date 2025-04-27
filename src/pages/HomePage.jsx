// src/pages/HomePage.jsx
import React, { useEffect, useState } from 'react';
import { getAllPokemons } from '../services/api';
import PokemonCard from '../components/pokemonCard';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css';
import pokedexLogo from '../assets/pokedex/pokedex.png';

function HomePage() {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 10;

  const navigate = useNavigate();

  useEffect(() => {
    getAllPokemons()
      .then((data) => {
        const deletedPokemons = JSON.parse(localStorage.getItem('deletedPokemons')) || [];
        const deletedIds = deletedPokemons.map(p => p.id);

        const resurrectedPokemons = JSON.parse(localStorage.getItem('resurrectedPokemons')) || [];
        const resurrectedWithFlag = resurrectedPokemons.map(pokemon => ({
          ...pokemon,
          isResurrected: true
        }));

        const alivePokemons = data.filter(p => !deletedIds.includes(p.id));
        const combined = [...alivePokemons, ...resurrectedWithFlag];

        setPokemons(combined);
        setLoading(false);
      })
      .catch((err) => {
        setError('Erreur lors du chargement des Pokémon.');
        setLoading(false);
      });
  }, []);

  const uniqueTypes = [...new Set(pokemons.flatMap((pokemon) => pokemon.type || pokemon.types || []))];

  const filteredPokemons = pokemons.filter(
    (pokemon) =>
      (selectedType === '' || (pokemon.types || pokemon.type || []).includes(selectedType)) &&
      (pokemon.name.english || pokemon.name).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
  const totalPages = Math.ceil(filteredPokemons.length / pokemonsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="App">
      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'flex-start',
        alignItems: 'center', padding: '10px 20px', backgroundColor: '#f5f5f5'
      }}>
        <button
          onClick={handleLogout}
          style={{
            marginRight: '10px', padding: '8px 16px',
            backgroundColor: '#ff5c5c', color: 'white',
            border: 'none', borderRadius: '6px', fontWeight: 'bold'
          }}
        >
          Se déconnecter
        </button>
        <Link to="/login" style={{ marginRight: '10px' }}>
          <button
            style={{
              padding: '8px 16px', backgroundColor: '#64b5f6',
              color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold'
            }}
          >
            Se connecter
          </button>
        </Link>
        <Link to="/register">
          <button
            style={{
              padding: '8px 16px', backgroundColor: '#f06292',
              color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold'
            }}
          >
            S'inscrire
          </button>
        </Link>
      </div>

      {/* Logo */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '30px 0' }}>
        <img src={pokedexLogo} alt="Pokedex Logo" style={{ width: '300px' }} />
      </div>

      {/* Recherche / Filtre / Boutons */}
      <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        flexWrap: 'wrap', gap: '15px', marginBottom: '30px'
      }}>
        <input
          type="text"
          placeholder="Rechercher un Pokémon"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: '1', minWidth: '200px', padding: '8px', borderRadius: '6px', border: '1px solid gray'
          }}
        />
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          style={{
            flex: '1', minWidth: '200px', padding: '8px', borderRadius: '6px', border: '1px solid gray'
          }}
        >
          <option value="">Tous les types</option>
          {uniqueTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <Link to="/create">
          <button
            style={{
              padding: '8px 20px', backgroundColor: '#d6336c',
              color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold'
            }}
          >
            Créer un Pokémon
          </button>
        </Link>
        <Link to="/cimtrex">
          <button
            style={{
              padding: '8px 20px', backgroundColor: 'black',
              color: 'red', border: 'none', borderRadius: '6px', fontWeight: 'bold'
            }}
          >
            Cimtrex Pokédex
          </button>
        </Link>
      </div>

      {/* Liste des Pokémon */}
      <div className="pokemon-container">
        {currentPokemons.map((pokemon) => (
          <Link to={`/pokemon/${pokemon.id}`} className="pokemon-link" key={pokemon.id}>
            <PokemonCard pokemon={pokemon} buttonColor="#880e4f" isResurrected={pokemon.isResurrected} />
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
        {pageNumbers.map((num) => (
          <button
            key={num}
            onClick={() => setCurrentPage(num)}
            style={{
              padding: '8px 12px', backgroundColor: num === currentPage ? '#ec407a' : '#e0e0e0',
              color: num === currentPage ? 'white' : 'black', border: 'none',
              borderRadius: '6px', cursor: 'pointer'
            }}
          >
            {num}
          </button>
        ))}
      </div>

      {/* Footer */}
      <footer style={{ backgroundColor: '#f1f3f5', textAlign: 'center', padding: '20px 10px', fontSize: '0.9rem', color: '#495057' }}>
  Fait par <strong>Jamel Allal</strong> | Suivez-moi sur
  <a href="https://www.instagram.com/pokemon/" target="_blank" rel="noopener noreferrer" style={{ marginLeft: '8px', verticalAlign: 'middle' }}>
    <img src="src/assets/instagram.png" alt="Instagram" style={{ width: '24px', height: '24px', verticalAlign: 'middle' }} />
  </a>
</footer>

    </div>
  );
}

export default HomePage;
