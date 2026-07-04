import React from 'react'

/**
 * @param {{
 *   children: React.ReactNode,
 *   className?: string,
 *   padding?: boolean,
 *   hover?: boolean,
 *   onClick?: Function,
 * }} props
 */
export default function Card({ children, className = '', padding = true, hover = false, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`
        rounded-xl border border-slate-700/60 bg-slate-800/50 backdrop-blur-sm
        ${padding ? 'p-5' : ''}
        ${hover ? 'hover:border-slate-600 hover:bg-slate-800 transition-all duration-200 cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
