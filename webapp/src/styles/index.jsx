import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components/macro';
import theme from './theme';
import GlobalStyles from './GlobalStyles';

Styles.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function Styles({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
}
