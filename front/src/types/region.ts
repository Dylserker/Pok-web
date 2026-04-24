import type { ComponentProps } from 'react'

export type PokemonRegionOption = {
  value: string
  label: string
  generation: number
}

export type RegionSelectProps = Omit<ComponentProps<'button'>, 'onClick'> & {
  label?: string
  options?: PokemonRegionOption[]
  onRegionChange?: (region: string) => void
}
