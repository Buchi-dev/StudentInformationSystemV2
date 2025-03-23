import { theme } from 'antd';

export const layoutStyles = {
  content: {
    margin: '24px',
    padding: '24px',
    minHeight: 280,
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
    overflow: 'auto'
  },
  mainLayout: {
    marginLeft: 200,
    transition: 'all 0.2s ease',
    background: '#f5f5f5'
  }
};

export const themeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: '#1890ff',
    borderRadius: 6,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
  }
}; 