import type { ComponentProps } from 'react'

export type PokemonGameOption = {
  value: string
  label: string
}

export type GameSelectProps = Omit<ComponentProps<'button'>, 'children' | 'type' | 'value'> & {
  label?: string
  options?: PokemonGameOption[]
  value?: string
  onGameChange?: (game: string) => void
}