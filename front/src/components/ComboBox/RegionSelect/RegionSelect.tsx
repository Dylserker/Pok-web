import { useEffect, useId, useRef, useState } from 'react'
import type { RegionSelectProps } from '../../../types/region'
import { POKEMON_REGIONS } from '../../../constants/regions'
import './RegionSelect.css'

function RegionSelect({
	id,
	className,
	label = 'Région Pokémon',
	options = POKEMON_REGIONS,
	onRegionChange,
	value = '',
	...selectProps
}: RegionSelectProps) {
	const reactId = useId()
	const selectId = id ?? `pokemon-region-select-${reactId}`
	const listboxId = `${selectId}-listbox`
	const labelId = `${selectId}-label`
	const rootRef = useRef<HTMLDivElement>(null)
	const [isOpen, setIsOpen] = useState(false)

	const selectedOption = options.find((option) => option.value === value)
	const buttonLabel = selectedOption?.label ?? 'Choisir une région...'

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

	const handleOptionSelect = (region: string) => {
		onRegionChange?.(region)
		setIsOpen(false)
	}

	return (
		<div ref={rootRef} className={`region-select ${className ?? ''}`.trim()}>
			<span id={labelId} className="region-select-label">
				{label}
			</span>
			<button
				type="button"
				id={selectId}
				aria-labelledby={labelId}
				aria-haspopup="listbox"
				aria-controls={listboxId}
				aria-expanded={isOpen}
				className="region-select-trigger"
				{...selectProps}
				onClick={() => setIsOpen((currentValue) => !currentValue)}
			>
				<span className={`region-select-trigger-value${selectedOption ? '' : ' is-placeholder'}`}>
					{buttonLabel}
				</span>
				<span className="region-select-trigger-icon" aria-hidden="true">
					▾
				</span>
			</button>
			{isOpen ? (
				<div id={listboxId} role="listbox" className="region-select-menu">
					{options.map((option) => {
						const isSelected = option.value === value

						return (
							<button
								key={option.value}
								type="button"
								role="option"
								aria-selected={isSelected}
								className={`region-select-option${isSelected ? ' is-selected' : ''}`}
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

export default RegionSelect

