export type PokemonApiStat = {
  base_stat: number
  stat: {
    name: string
  }
}

export type PokemonApiResponse = {
  id: number
  name: string
  types: Array<{
    slot: number
    type: {
      name: string
    }
  }>
  stats: PokemonApiStat[]
  sprites: {
    front_default: string | null
    other?: {
      'official-artwork'?: {
        front_default: string | null
      }
    }
  }
}

export type PokemonSpeciesApiResponse = {
  names: Array<{
    language: {
      name: string
    }
    name: string
  }>
  varieties?: Array<{
    pokemon: {
      name: string
    }
  }>
}

export type PokemonFrenchNamesGraphQlResponse = {
  data?: {
    pokemon_v2_pokemonspeciesname?: Array<{
      name: string
      pokemon_species_id: number
    }>
  }
}

export type PokemonStat = {
  label: string
  value: number | string
}

export type CardProps = {
  name: string
  number: number | string
  image: string
  types: string[]
  stats: PokemonStat[]
}

export type PokemonTypeApiResponse = {
  names: Array<{
    language: {
      name: string
    }
    name: string
  }>
}

export type PokemonCardData = {
  name: string
  number: number
  image: string
  types: string[]
  stats: Array<{
    label: string
    value: number
  }>
}

export type PokemonFormKey = 'default' | 'alola' | 'galar' | 'hisui' | 'paldea'

export type PokemonFormOption = {
  value: PokemonFormKey
  label: string
  apiSuffix: string | null
}
