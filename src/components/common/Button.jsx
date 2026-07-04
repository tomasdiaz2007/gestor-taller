import React from 'react'

const variants = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-blue-500/30',
  secondary: 'bg-slate-700 hover:bg-slate-600 text-slate-100 border border-slate-600',
  danger: 'bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-red-500/30',
  ghost: 'bg-transparent hover:bg-slate-700 text-slate-300 border border-slate-600',
  success: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-emerald-500/30',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
}

/**
 * @param {{
 *   children: React.ReactNode,
 *   variant?: 'primary'|'secondary'|'danger'|'ghost'|'success',
 *   size?: 'sm'|'md'|'lg',
 *   loading?: boolean,
 *   disabled?: boolean,
 *   onClick?: Function,
 *   type?: string,
 *   className?: string,
 *   id?: string,
 * }} props
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  id,
}) {
  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        inline-flex items-center gap-2 rounded-lg font-medium
        transition-all duration-200 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}
      `}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      )}
      {children}
    </button>
  )
}
