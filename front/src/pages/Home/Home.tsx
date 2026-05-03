import { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Searchbar from '../../components/Searchbar/Searchbar'
import Card from '../../components/Card/PokemonCard/PokemonCard'
import StrategicCard from '../../components/Card/StrategicCard/StrategicCard'
import FormSwitch from '../../components/Buttons/FormSwitch/FormSwitch'
import {
  FORM_OPTIONS,
  getAvailableFormsFromSpecies,
  getLocalizedTypes,
  mapPokemonToCard,
  resolvePokemonIdentifier
} from '../../functions/pokemon'
import type {
  PokemonApiResponse,
  PokemonCardData,
  PokemonFormKey,
  PokemonSpeciesApiResponse
} from '../../types/pokemon'
import './Home.css'

function Home() {
  const [searchValue, setSearchValue] = useState('')
  const [selectedForm, setSelectedForm] = useState<PokemonFormKey>('default')
  const [availableForms, setAvailableForms] = useState<PokemonFormKey[]>(['default'])
  const [pokemon, setPokemon] = useState<PokemonCardData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const query = searchValue.trim().toLowerCase()

    if (!query) {
      setPokemon(null)
      setErrorMessage('')
      setAvailableForms(['default'])
      setSelectedForm('default')
      setIsLoading(false)
      return
    }

    const controller = new AbortController()
    const debounceId = window.setTimeout(async () => {
      setIsLoading(true)
      setErrorMessage('')

      try {
        const resolvedIdentifier = await resolvePokemonIdentifier(query, controller.signal)
        const baseResponse = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(resolvedIdentifier)}`,
          {
            signal: controller.signal
          }
        )

        if (!baseResponse.ok) {
          throw new Error('pokemon-not-found')
        }

        const baseData = (await baseResponse.json()) as PokemonApiResponse
          let data = baseData
          let nextAvailableForms: PokemonFormKey[] = ['default']

        let speciesData: PokemonSpeciesApiResponse | null = null
        try {
          const speciesResponse = await fetch(
            `https://pokeapi.co/api/v2/pokemon-species/${baseData.id}`,
            {
              signal: controller.signal
            }
          )

          if (speciesResponse.ok) {
            speciesData = (await speciesResponse.json()) as PokemonSpeciesApiResponse
            nextAvailableForms = getAvailableFormsFromSpecies(speciesData)
            setAvailableForms(nextAvailableForms)

            if (!nextAvailableForms.includes(selectedForm) && selectedForm !== 'default') {
              setSelectedForm('default')
            }
          } else {
            setAvailableForms(['default'])
          }
        } catch (speciesError) {
          if ((speciesError as Error).name === 'AbortError') {
            return
          }

          setAvailableForms(['default'])
        }

        const selectedFormOption = FORM_OPTIONS.find(
          (option) => option.value === selectedForm
        )

        const canUseSelectedForm = nextAvailableForms.includes(selectedForm)

        if (selectedFormOption?.apiSuffix && canUseSelectedForm) {
          const formIdentifier = `${baseData.name}-${selectedFormOption.apiSuffix}`
          const formResponse = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(formIdentifier)}`,
            {
              signal: controller.signal
            }
          )

          if (!formResponse.ok) {
            throw new Error('pokemon-form-not-found')
          }

          data = (await formResponse.json()) as PokemonApiResponse
        }

        let frenchName = data.name
        let frenchTypes = data.types.map((item) => item.type.name)

        if (speciesData) {
          const frenchEntry = speciesData.names.find(
            (entry) => entry.language.name === 'fr'
          )

          if (frenchEntry?.name) {
            frenchName = frenchEntry.name
          }
        }

        try {
          frenchTypes = await getLocalizedTypes(data, controller.signal)
        } catch (typesError) {
          if ((typesError as Error).name === 'AbortError') {
            return
          }
        }

        setPokemon(mapPokemonToCard(data, frenchName, frenchTypes))
      } catch (error) {
        if ((error as Error).name === 'AbortError') {
          return
        }

        setPokemon(null)
        setAvailableForms(['default'])

        if ((error as Error).message === 'pokemon-form-not-found') {
          setErrorMessage('Cette forme n\'est pas disponible pour ce Pokémon.')
        } else {
          setErrorMessage('Pokémon introuvable. Essaie un nom ou un numéro.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }, 350)

    return () => {
      controller.abort()
      window.clearTimeout(debounceId)
    }
  }, [searchValue, selectedForm])

  return (
    <div className="page-shell">
      <Header />
      <main className="home-main">
        <section className="home-hero" aria-labelledby="home-title">
          <p className="hero-kicker">Pokedex interactif</p>
          <h1 id="home-title">
            Bienvenue sur <span>PokéWeb</span>
          </h1>
          <p className="hero-subtitle">
            Explore rapidement les Pokémon, leurs types et leurs principales
            caractéristiques depuis une interface claire.
          </p>
          <Searchbar
            placeholder="Rechercher un Pokémon (nom FR, nom EN ou numéro)..."
            containerClassName="home-searchbar"
            className="home-search-input"
            aria-label="Rechercher un Pokémon"
            value={searchValue}
            onValueChange={setSearchValue}
          />
          <FormSwitch
            className="home-form-switch"
            options={FORM_OPTIONS.map(({ value, label }) => ({
              value,
              label,
              disabled: !availableForms.includes(value)
            }))}
            currentValue={selectedForm}
            onChange={(value) => setSelectedForm(value as PokemonFormKey)}
            ariaLabel="Basculer la forme Pokémon"
          />

          <section className="home-result" aria-live="polite">
            {isLoading ? <p className="search-status">Recherche en cours...</p> : null}

            {!isLoading && errorMessage ? (
              <p className="search-status search-status-error">{errorMessage}</p>
            ) : null}

            {!isLoading && !errorMessage && pokemon ? (
              <div className="home-result-cards">
                <Card {...pokemon} />
                <StrategicCard pokemonId={pokemon.number} title="Strategic Build" />
              </div>
            ) : null}
          </section>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Home
