import type {
	PokemonApiResponse,
	PokemonCardData,
	PokemonFormKey,
	PokemonFormOption,
	PokemonFrenchNamesGraphQlResponse,
	PokemonSpeciesApiResponse,
	PokemonTypeApiResponse
} from '../types/pokemon'

const STAT_LABELS: Record<string, string> = {
	hp: 'PV',
	attack: 'Attaque',
	defense: 'Défense',
	'special-attack': 'Att. spé',
	'special-defense': 'Déf. spé',
	speed: 'Vitesse'
}

const POKEAPI_GRAPHQL_URL = 'https://beta.pokeapi.co/graphql/v1beta'

export const FORM_OPTIONS: PokemonFormOption[] = [
	{ value: 'default', label: 'Forme normale', apiSuffix: null },
	{ value: 'alola', label: 'Alola', apiSuffix: 'alola' },
	{ value: 'galar', label: 'Galar', apiSuffix: 'galar' },
	{ value: 'hisui', label: 'Hisui', apiSuffix: 'hisui' },
	{ value: 'paldea', label: 'Paldea', apiSuffix: 'paldea' }
]

let frenchNameToSpeciesIdCache: Map<string, number> | null = null
const localizedTypeNameCache = new Map<string, string>()

export function getAvailableFormsFromSpecies(speciesData: PokemonSpeciesApiResponse): PokemonFormKey[] {
	const available = new Set<PokemonFormKey>(['default'])
	const variationNames = speciesData.varieties?.map((variety) => variety.pokemon.name) ?? []

	for (const option of FORM_OPTIONS) {
		if (!option.apiSuffix) {
			continue
		}

		const hasRegionalForm = variationNames.some((name) =>
			name.endsWith(`-${option.apiSuffix}`)
		)

		if (hasRegionalForm) {
			available.add(option.value)
		}
	}

	return FORM_OPTIONS.map((option) => option.value).filter((value) => available.has(value))
}

function normalizePokemonName(value: string): string {
	return value
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9]/g, '')
}

async function getFrenchNameToSpeciesIdMap(signal: AbortSignal): Promise<Map<string, number>> {
	if (frenchNameToSpeciesIdCache) {
		return frenchNameToSpeciesIdCache
	}

	const response = await fetch(POKEAPI_GRAPHQL_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			query: `
				query PokemonFrenchNames {
					pokemon_v2_pokemonspeciesname(
						limit: 2000
						where: { pokemon_v2_language: { name: { _eq: "fr" } } }
					) {
						name
						pokemon_species_id
					}
				}
			`
		}),
		signal
	})

	if (!response.ok) {
		throw new Error('french-name-index-unavailable')
	}

	const payload = (await response.json()) as PokemonFrenchNamesGraphQlResponse
	const entries = payload.data?.pokemon_v2_pokemonspeciesname ?? []
	const map = new Map<string, number>()

	for (const entry of entries) {
		map.set(normalizePokemonName(entry.name), entry.pokemon_species_id)
	}

	frenchNameToSpeciesIdCache = map
	return map
}

export async function resolvePokemonIdentifier(query: string, signal: AbortSignal): Promise<string> {
	if (/^\d+$/.test(query)) {
		return query
	}

	const frenchNameMap = await getFrenchNameToSpeciesIdMap(signal)
	const speciesId = frenchNameMap.get(normalizePokemonName(query))

	if (speciesId) {
		return String(speciesId)
	}

	return query
}

export function mapPokemonToCard(
	pokemon: PokemonApiResponse,
	localizedName?: string,
	localizedTypes?: string[]
): PokemonCardData {
	const image =
		pokemon.sprites.other?.['official-artwork']?.front_default ??
		pokemon.sprites.front_default ??
		''

	const defaultTypes = pokemon.types
		.slice()
		.sort((a, b) => a.slot - b.slot)
		.map((item) => item.type.name)

	return {
		name: localizedName ?? pokemon.name,
		number: pokemon.id,
		image,
		types: localizedTypes ?? defaultTypes,
		stats: pokemon.stats.map((item) => ({
			label: STAT_LABELS[item.stat.name] ?? item.stat.name,
			value: item.base_stat
		}))
	}
}

async function getLocalizedTypeName(typeName: string, signal: AbortSignal): Promise<string> {
	const cachedTypeName = localizedTypeNameCache.get(typeName)

	if (cachedTypeName) {
		return cachedTypeName
	}

	try {
		const response = await fetch(
			`https://pokeapi.co/api/v2/type/${encodeURIComponent(typeName)}`,
			{ signal }
		)

		if (!response.ok) {
			return typeName
		}

		const data = (await response.json()) as PokemonTypeApiResponse
		const frenchEntry = data.names.find((entry) => entry.language.name === 'fr')
		const localizedTypeName = frenchEntry?.name ?? typeName

		localizedTypeNameCache.set(typeName, localizedTypeName)
		return localizedTypeName
	} catch (error) {
		if ((error as Error).name === 'AbortError') {
			throw error
		}

		return typeName
	}
}

export async function getLocalizedTypes(
	pokemon: PokemonApiResponse,
	signal: AbortSignal
): Promise<string[]> {
	const sortedTypeNames = pokemon.types
		.slice()
		.sort((a, b) => a.slot - b.slot)
		.map((item) => item.type.name)

	return Promise.all(sortedTypeNames.map((typeName) => getLocalizedTypeName(typeName, signal)))
}
