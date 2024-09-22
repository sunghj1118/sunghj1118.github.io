import React from 'react';
import { createGlobalStyle } from 'styled-components';
import Container from './Container';
import Footer from './Footer';
import './layout.css';
import ViewCount from './ViewCount';

const GlobalStyle = createGlobalStyle`
  /* Add any additional global styles here if needed */
`;

const Layout = ({ children, location }) => (
  <>
    <GlobalStyle />
    <Container>
      <div className="markdown-body">
        {children}
        {location && location.pathname && (
          <ViewCount path={location.pathname} />
        )}
      </div>
    </Container>
    <Footer />
  </>
);

export default Layout;
