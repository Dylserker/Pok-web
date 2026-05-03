import type { CSSProperties } from 'react'

const TYPE_COLORS: Record<string, string> = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
  unknown: '#6B7280',
  shadow: '#374151',
  stellar: '#2563EB',
  feu: '#EE8130',
  eau: '#6390F0',
  plante: '#7AC74C',
  electrique: '#F7D02C',
  electrik: '#F7D02C',
  glace: '#96D9D6',
  combat: '#C22E28',
  sol: '#E2BF65',
  vol: '#A98FF3',
  psy: '#F95587',
  insecte: '#A6B91A',
  roche: '#B6A136',
  spectre: '#735797',
  tenebres: '#705746',
  acier: '#B7B7CE',
  fee: '#D685AD'
}

function normalizeTypeName(typeName: string): string {
  return typeName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function isLightColor(hexColor: string): boolean {
  const cleanHex = hexColor.replace('#', '')
  const normalizedHex =
    cleanHex.length === 3
      ? cleanHex
          .split('')
          .map((char) => char + char)
          .join('')
      : cleanHex

  const red = Number.parseInt(normalizedHex.slice(0, 2), 16)
  const green = Number.parseInt(normalizedHex.slice(2, 4), 16)
  const blue = Number.parseInt(normalizedHex.slice(4, 6), 16)

  const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255
  return luminance > 0.65
}

export function getPokemonTypeChipStyle(typeName: string): CSSProperties {
  const normalizedTypeName = normalizeTypeName(typeName)
  const backgroundColor = TYPE_COLORS[normalizedTypeName] ?? '#9CA3AF'

  return {
    backgroundColor,
    color: isLightColor(backgroundColor) ? '#111827' : '#F9FAFB',
    borderColor: isLightColor(backgroundColor) ? 'rgba(17, 24, 39, 0.12)' : 'rgba(249, 250, 251, 0.28)'
  }
}

export function getPokemonTypeColor(typeName: string): string {
  const normalizedTypeName = normalizeTypeName(typeName)
  return TYPE_COLORS[normalizedTypeName] ?? '#9CA3AF'
}

export function getPokemonCardBorderStyle(types: string[]): CSSProperties {
  const primaryColor = getPokemonTypeColor(types[0] ?? 'unknown')
  const secondaryColor = types[1] ? getPokemonTypeColor(types[1]) : primaryColor

  const borderGradient =
    primaryColor === secondaryColor
      ? `linear-gradient(${primaryColor}, ${primaryColor})`
      : `conic-gradient(from 0deg, ${primaryColor} 0deg 180deg, ${secondaryColor} 180deg 360deg)`

  return {
    '--card-border-gradient': borderGradient
  } as CSSProperties
}
