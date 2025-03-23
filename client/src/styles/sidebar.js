import { colors } from './common';

export const sidebarStyles = {
  sider: {
    background: colors.white,
    height: '100vh',
    position: 'fixed',
    left: 0,
    zIndex: 1000,
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    display: 'flex',
    flexDirection: 'column'
  },
  logo: {
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: `1px solid ${colors.border}`,
    padding: '16px'
  },
  logoText: {
    color: colors.primary,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  mainMenu: {
    flex: 1,
    borderRight: 0
  },
  logoutMenu: {
    borderRight: 0,
    borderTop: `1px solid ${colors.border}`
  }
}; 