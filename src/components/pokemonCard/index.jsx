// src/components/PokemonCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../../index.css";

// Images fantômes importées
import ghost1 from '../../assets/ghost1.png';
import ghost2 from '../../assets/ghost2.png';

const PokemonCard = ({ pokemon }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pokemon/${pokemon.id}`);
  };

  const stats = pokemon.stats || pokemon.base || {};
  const types = pokemon.types || pokemon.type || [];

  return (
    <div className="pokemon-card" onClick={pokemon.isResurrected ? undefined : handleClick} style={{ cursor: pokemon.isResurrected ? "default" : "pointer" }}>
      {/* Image */}
      <div className="pokemon-image-container">
        {pokemon.isResurrected ? (
          <img
            src={pokemon.ghostVersion === 1 ? ghost1 : ghost2}
            alt="Spectrex"
            className="pokemon-image"
            style={{ objectFit: 'contain', backgroundColor: '#111', borderRadius: '10px' }}
          />
        ) : (
          <img
            src={pokemon.image ? pokemon.image : `/assets/pokemons/${pokemon.id}.png`}
            alt={pokemon.name?.english || "Pokémon"}
            className="pokemon-image"
          />
        )}
      </div>

      {/* Infos */}
      <div className="pokemon-info">
        <h2 className="pokemon-name">{pokemon.name?.english || "Sans nom"}</h2>
        <p className="pokemon-type">
          {Array.isArray(types) && types.length > 0
            ? `Type: ${types.join(", ").toLowerCase()}`
            : "Type: Inconnu"}
        </p>
      </div>

      {/* Stats */}
      <div className="pokemon-stats">
        <p>HP: {stats.hp ?? stats.HP ?? "?"}</p>
        <p>Attack: {stats.attack ?? stats.Attack ?? "?"}</p>
        <p>Defense: {stats.defense ?? stats.Defense ?? "?"}</p>
        <p>Speed: {stats.speed ?? stats.Speed ?? "?"}</p>
      </div>

      {/* Bouton Voir */}
      {!pokemon.isResurrected && (
        <button
          className="attack-button"
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
        >
          Voir
        </button>
      )}
    </div>
  );
};

export default PokemonCard;
