import React, { useEffect, useRef } from 'react'

/**
 * @param {{
 *   isOpen: boolean,
 *   onClose: () => void,
 *   title?: string,
 *   children: React.ReactNode,
 *   footer?: React.ReactNode,
 * }} props
 */
export default function Modal({ isOpen, onClose, title, children, footer }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!isOpen || !dialog) return
    dialog.showModal()
    return () => dialog.open && dialog.close()
  }, [isOpen])

  if (!isOpen) return null

  return (
    <dialog ref={dialogRef} onCancel={(event) => { event.preventDefault(); onClose() }}>
      <div>
        {/* Header */}
        {title && (
          <div>
            <h2>{title}</h2>
            <button
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        )}

        {/* Body */}
        <div>{children}</div>

        {/* Footer */}
        {footer && (
          <div>
            {footer}
          </div>
        )}
      </div>
    </dialog>
  )
}
