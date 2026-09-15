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
      className={`card${padding ? ' card--padded' : ''}${hover ? ' card--interactive' : ''} ${className}`}
    >
      {children}
    </div>
  )
}
