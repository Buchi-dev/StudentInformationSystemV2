import { colors, gradients } from './common';

// Styles for pages components

// Shared styles for all pages
export const pageStyles = {
  container: {
    padding: '20px'
  },
  headerCard: {
    marginBottom: '20px'
  },
  headerSpace: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  tableCard: {
    padding: 0
  },
  tableScroll: {
    y: 'calc(100vh - 300px)'
  },
  modalWidth: {
    width: 600
  }
};

// Dashboard specific styles
export const dashboardStyles = {
  container: {
    padding: '24px'
  },
  welcomeCard: {
    marginBottom: '24px',
    borderRadius: '12px',
    background: gradients.primary,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  },
  welcomeText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: '16px'
  },
  welcomeTitle: {
    color: colors.white,
    margin: 0
  },
  welcomeDate: {
    color: 'rgba(255,255,255,0.85)'
  },
  actionsCard: {
    borderRadius: '12px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
  },
  quickActionCard: {
    borderRadius: '12px',
    height: '100%',
    border: 'none',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease'
  },
  quickActionCardBody: {
    padding: '24px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  quickActionIcon: {
    fontSize: '32px',
    marginBottom: '16px'
  },
  quickActionTitle: {
    color: colors.white,
    margin: '0 0 8px 0'
  },
  quickActionText: {
    color: 'rgba(255, 255, 255, 0.85)'
  }
};

// AddStudent specific styles
export const addStudentStyles = {
  ...pageStyles
};

// AddUser specific styles
export const addUserStyles = {
  ...pageStyles
}; 