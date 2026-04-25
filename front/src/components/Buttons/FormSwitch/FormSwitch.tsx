import './FormSwitch.css'
import type { FormSwitchProps } from '../../../types/switch'

function FormSwitch({
  options,
  currentValue,
  onChange,
  className,
  ariaLabel = 'Choisir une forme'
}: FormSwitchProps) {
  return (
    <div className={`form-switch ${className ?? ''}`.trim()} role="group" aria-label={ariaLabel}>
      {options.map((option) => {
        const isActive = option.value === currentValue

        return (
          <button
            key={option.value}
            type="button"
            className={`form-switch-button ${isActive ? 'is-active' : ''} ${option.disabled ? 'is-disabled' : ''}`.trim()}
            onClick={() => {
              if (!option.disabled) {
                onChange(option.value)
              }
            }}
            aria-pressed={isActive}
            disabled={option.disabled}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

export default FormSwitch
