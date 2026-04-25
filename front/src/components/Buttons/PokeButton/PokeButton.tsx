import './PokeButton.css'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type PokeballButtonProps = {
	children?: ReactNode
	className?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

function PokeButton({ children = 'Button', className, ...buttonProps }: PokeballButtonProps) {
	return (
		<button
			type="button"
			className={`pokeball-button ${className ?? ''}`.trim()}
			{...buttonProps}
		>
			<span className="pokeball-button-label">{children}</span>
			<span className="pokeball-button-center" aria-hidden="true" />
		</button>
	)
}

export default PokeButton
