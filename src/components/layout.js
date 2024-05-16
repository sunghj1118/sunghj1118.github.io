// src/components/layout.js

import React from 'react';
import { createGlobalStyle } from 'styled-components';
import Container from './Container';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif; // Default font
    background-color: #f5f5f5; // Light background for better contrast
    margin: 0;
    padding: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Montserrat', sans-serif; // Headings font
  }

  button {
    font-family: 'Poppins', sans-serif; // Button font
  }
`;

const Layout = ({ children }) => (
  <>
    <GlobalStyle />
    <Container>
      {children}
    </Container>
  </>
);

export default Layout;
