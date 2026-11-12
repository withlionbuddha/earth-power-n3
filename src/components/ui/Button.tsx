import type { ButtonHTMLAttributes, ReactNode } from 'react'
import './ui.css'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  children: ReactNode
}

export default function Button({ variant = 'primary', size = 'md', loading = false, disabled, className = '', type = 'button', children, ...props }: ButtonProps) {
  return <button type={type} className={['ui-button', `ui-button--${variant}`, `ui-button--${size}`, className].filter(Boolean).join(' ')} disabled={disabled || loading} aria-busy={loading || undefined} {...props}>
    {loading ? <span className="ui-button__spinner" aria-hidden="true" /> : null}
    {children}
  </button>
}
