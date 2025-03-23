// Theme colors
export const colors = {
  primary: '#1890ff',
  primaryDark: '#096dd9',
  success: '#52c41a',
  successDark: '#389e0d',
  text: '#333',
  textSecondary: 'rgba(0, 0, 0, 0.45)',
  background: '#f5f5f5',
  white: '#fff',
  border: '#f0f0f0'
};

// Gradients
export const gradients = {
  primary: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
  success: `linear-gradient(135deg, ${colors.success} 0%, ${colors.successDark} 100%)`
};

// Common styles
export const commonStyles = {
  card: {
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
  },
  page: {
    padding: '24px'
  }
}; 