import './PokemonCard.css'
import { getPokemonTypeChipStyle } from '../../../constants/pokemonTypes'
import type { CardProps } from '../../../types/pokemon'

function PokemonCard({ name, number, image, types, stats }: CardProps) {
  const formattedNumber = String(number).padStart(3, '0')

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-name">{name}</h2>
        <span className="card-number">#{formattedNumber}</span>
      </div>

      <img className="card-image" src={image} alt={name} />

      <div className="card-types">
        {types.map((type) => (
          <span key={type} className="card-type-chip" style={getPokemonTypeChipStyle(type)}>
            {type}
          </span>
        ))}
      </div>

      <ul className="card-stats">
        {stats.map((stat) => (
          <li key={stat.label} className="card-stat-item">
            <span className="card-stat-label">{stat.label}</span>
            <span className="card-stat-value">{stat.value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PokemonCard