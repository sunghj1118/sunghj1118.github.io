import React from 'react';
import { createGlobalStyle } from 'styled-components';
import Container from './Container';
import Footer from './Footer';
import './layout.css';

const GlobalStyle = createGlobalStyle`
  /* Add any additional global styles here if needed */
`;

const Layout = ({ children }) => (
  <>
    <GlobalStyle />
    <Container>
      <div className="markdown-body">
        {children}
      </div>
    </Container>
    <Footer />
  </>
);

export default Layout;
