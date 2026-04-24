import type { ComponentProps } from 'react'

export type PokemonAreaOption = {
  value: string
  label: string
  region: string
}

export type AreaSelectProps = Omit<ComponentProps<'button'>, 'onClick'> & {
  region: string
  label?: string
  options?: PokemonAreaOption[]
  onAreaChange?: (area: string) => void
}
