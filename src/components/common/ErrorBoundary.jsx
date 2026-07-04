import React from 'react'

/**
 * ErrorBoundary — captura errores de render y los muestra en pantalla
 * en lugar de dejar la página en blanco.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          background: '#0f172a',
          color: '#f1f5f9',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          fontFamily: 'monospace',
        }}>
          <h1 style={{ color: '#ef4444', marginBottom: '1rem' }}>Error de renderizado</h1>
          <pre style={{
            background: '#1e293b',
            padding: '1rem',
            borderRadius: '8px',
            maxWidth: '800px',
            width: '100%',
            overflow: 'auto',
            fontSize: '14px',
            color: '#fca5a5',
          }}>
            {this.state.error?.toString()}
            {'\n\n'}
            {this.state.error?.stack}
          </pre>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1.5rem',
              background: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Reintentar
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
