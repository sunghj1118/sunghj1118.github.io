import React from 'react';
import Header from './header';
import styled from 'styled-components';
import './layout.css';

const Main = styled.main`
  padding: 2rem;
`;

const Layout = ({ children }) => (
  <>
    <Header />
    <Main>{children}</Main>
  </>
);

export default Layout;
