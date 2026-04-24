import type { ReactNode } from 'react'

export type TrainerItem = Record<string, ReactNode>

export type TrainerColumn = {
  key: string
  render?: (item: TrainerItem) => ReactNode
}

export type TrainerTableProps = {
  title?: string
  portrait?: string | null
  columns?: TrainerColumn[]
  items?: TrainerItem[]
  highlightLast?: boolean
  onItemClick?: ((item: TrainerItem) => void) | null
}