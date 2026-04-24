import { useEffect, useId, useMemo, useRef, useState } from 'react'
import type { AreaSelectProps } from '../../../types/area'
import { POKEMON_AREAS } from '../../../constants/areas'
import './AreaSelect.css'

function AreaSelect({
	id,
	className,
	region,
	label = 'Zone Pokémon',
	options = POKEMON_AREAS,
	onAreaChange,
	value = '',
	disabled,
	...selectProps
}: AreaSelectProps) {
	const reactId = useId()
	const selectId = id ?? `pokemon-area-select-${reactId}`
	const listboxId = `${selectId}-listbox`
	const labelId = `${selectId}-label`
	const rootRef = useRef<HTMLDivElement>(null)
	const [isOpen, setIsOpen] = useState(false)

	const filteredOptions = useMemo(
		() => options.filter((option) => option.region === region),
		[options, region]
	)

	const selectedOption = filteredOptions.find((option) => option.value === value)
	const buttonLabel = selectedOption?.label ?? (region ? 'Choisir une zone...' : "Choisis d'abord une région...")

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

	const handleOptionSelect = (area: string) => {
		onAreaChange?.(area)
		setIsOpen(false)
	}

	const isDisabled = disabled ?? region.length === 0

	return (
		<div ref={rootRef} className={`area-select ${className ?? ''}`.trim()}>
			<span id={labelId} className="area-select-label">
				{label}
			</span>
			<button
				type="button"
				id={selectId}
				aria-labelledby={labelId}
				aria-haspopup="listbox"
				aria-controls={listboxId}
				aria-expanded={isOpen}
				className="area-select-trigger"
				{...selectProps}
				disabled={isDisabled}
				onClick={() => setIsOpen((currentValue) => !currentValue)}
			>
				<span className={`area-select-trigger-value${selectedOption ? '' : ' is-placeholder'}`}>
					{buttonLabel}
				</span>
				<span className="area-select-trigger-icon" aria-hidden="true">
					▾
				</span>
			</button>
			{isOpen ? (
				<div id={listboxId} role="listbox" className="area-select-menu">
					{filteredOptions.map((option) => {
						const isSelected = option.value === value

						return (
							<button
								key={option.value}
								type="button"
								role="option"
								aria-selected={isSelected}
								className={`area-select-option${isSelected ? ' is-selected' : ''}`}
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

export default AreaSelect