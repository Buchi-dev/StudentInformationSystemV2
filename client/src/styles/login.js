import { colors } from './common';

export const loginStyles = {
  layout: {
    minHeight: '100vh',
    background: colors.background
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '50px 20px'
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    borderRadius: '12px'
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px'
  },
  title: {
    marginBottom: '8px',
    color: colors.primary
  },
  button: {
    height: '45px',
    borderRadius: '6px',
    fontWeight: '500'
  },
  footer: {
    textAlign: 'center',
    marginTop: '24px',
    borderTop: `1px solid ${colors.border}`,
    paddingTop: '24px'
  },
  footerTitle: {
    color: colors.primary,
    marginBottom: '8px',
    fontSize: '18px'
  },
  copyright: {
    fontSize: '12px'
  }
}; 