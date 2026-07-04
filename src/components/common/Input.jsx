import React, { forwardRef } from 'react'

/**
 * @param {{
 *   label?: string,
 *   error?: string,
 *   id: string,
 *   type?: string,
 *   placeholder?: string,
 *   value?: any,
 *   onChange?: Function,
 *   required?: boolean,
 *   disabled?: boolean,
 *   className?: string,
 * }} props
 */
const Input = forwardRef(function Input(
  { label, error, id, type = 'text', placeholder, value, onChange, required, disabled, className = '' },
  ref
) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-slate-300">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`
          w-full rounded-lg border px-3 py-2 text-sm
          bg-slate-800 text-slate-100 placeholder-slate-500
          transition-colors duration-150 outline-none
          ${error
            ? 'border-red-500 focus:border-red-400 focus:ring-1 focus:ring-red-500/30'
            : 'border-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30'
          }
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className}
        `}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
})

export default Input
