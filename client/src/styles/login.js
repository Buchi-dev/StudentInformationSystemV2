import { colors } from './common';

export const loginStyles = {
  layout: {
    minHeight: '100vh',
    background: colors.white
  },
  container: {
    display: 'flex',
    minHeight: '100vh',
  },
  leftSection: {
    flex: '1',
    background: colors.primary,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '48px',
    position: 'relative',
    overflow: 'hidden',
    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
  },
  rightSection: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '48px',
    background: colors.white,
  },
  logoContainer: {
    marginBottom: '24px',
    textAlign: 'center',
    background: colors.white,
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    width: '200px',
    height: '200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: '180px',
    height: '180px',
    objectFit: 'contain'
  },
  welcomeTitle: {
    color: colors.white,
    fontSize: '36px',
    marginBottom: '16px',
    textAlign: 'center'
  },
  welcomeText: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: '16px',
    textAlign: 'center',
    maxWidth: '400px',
    lineHeight: '1.6'
  },
  formContainer: {
    width: '100%',
    maxWidth: '400px'
  },
  formTitle: {
    fontSize: '28px',
    marginBottom: '8px',
    color: colors.text
  },
  formSubtitle: {
    marginBottom: '32px',
    color: colors.textSecondary
  },
  input: {
    height: '45px',
    borderRadius: '8px'
  },
  button: {
    height: '45px',
    borderRadius: '8px',
    fontWeight: '500',
    fontSize: '16px',
    boxShadow: '0 4px 12px rgba(24, 144, 255, 0.15)'
  },
  footer: {
    textAlign: 'center',
    marginTop: '32px'
  },
  footerTitle: {
    color: colors.text,
    marginBottom: '8px',
    fontSize: '16px'
  },
  copyright: {
    fontSize: '12px',
    color: colors.textSecondary
  },
  decorativeShape: {
    position: 'absolute',
    bottom: '-100px',
    right: '-100px',
    width: '300px',
    height: '300px',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '50%'
  }
};