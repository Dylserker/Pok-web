import { useEffect, useId, useRef, useState } from 'react'
import type { GameSelectProps } from '../../../types/game'
import { POKEMON_GAME_OPTIONS } from '../../../constants/games'
import './GameSelect.css'

function GameSelect({
	id,
	className,
	label = 'Jeu Pokémon',
	options = POKEMON_GAME_OPTIONS,
	onGameChange,
	value = '',
	...selectProps
}: GameSelectProps) {
	const reactId = useId()
	const selectId = id ?? `pokemon-game-select-${reactId}`
	const listboxId = `${selectId}-listbox`
	const labelId = `${selectId}-label`
	const rootRef = useRef<HTMLDivElement>(null)
	const [isOpen, setIsOpen] = useState(false)

	const selectedOption = options.find((option) => option.value === value)
	const buttonLabel = selectedOption?.label ?? 'Choisir un jeu...'

	useEffect(() => {
		const handlePointerDown = (event: MouseEvent | TouchEvent) => {
			if (!rootRef.current?.contains(event.target as Node)) {
				setIsOpen(false)
			}
		}

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setIsOpen(false)
			}
		}

		document.addEventListener('mousedown', handlePointerDown)
		document.addEventListener('touchstart', handlePointerDown)
		document.addEventListener('keydown', handleEscape)

		return () => {
			document.removeEventListener('mousedown', handlePointerDown)
			document.removeEventListener('touchstart', handlePointerDown)
			document.removeEventListener('keydown', handleEscape)
		}
	}, [])

	const handleOptionSelect = (game: string) => {
		onGameChange?.(game)
		setIsOpen(false)
	}

	return (
		<div ref={rootRef} className={`game-select ${className ?? ''}`.trim()}>
			<span id={labelId} className="game-select-label">
				{label}
			</span>
			<button
				type="button"
				id={selectId}
				aria-labelledby={labelId}
				aria-haspopup="listbox"
				aria-controls={listboxId}
				aria-expanded={isOpen}
				className="game-select-trigger"
				{...selectProps}
				onClick={() => setIsOpen((currentValue) => !currentValue)}
			>
				<span className={`game-select-trigger-value${selectedOption ? '' : ' is-placeholder'}`}>
					{buttonLabel}
				</span>
				<span className="game-select-trigger-icon" aria-hidden="true">
					▾
				</span>
			</button>
			{isOpen ? (
				<div id={listboxId} role="listbox" className="game-select-menu">
					{options.map((option) => {
						const isSelected = option.value === value

						return (
							<button
								key={option.value}
								type="button"
								role="option"
								aria-selected={isSelected}
								className={`game-select-option${isSelected ? ' is-selected' : ''}`}
								onClick={() => handleOptionSelect(option.value)}
							>
								{option.label}
							</button>
						)
					})}
				</div>
			) : null}
		</div>
	)
}

export default GameSelect