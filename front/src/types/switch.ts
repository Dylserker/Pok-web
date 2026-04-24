export type FormSwitchOption = {
  value: string
  label: string
  disabled?: boolean
}

export type FormSwitchProps = {
  options: FormSwitchOption[]
  currentValue: string
  onChange: (value: string) => void
  className?: string
  ariaLabel?: string
}