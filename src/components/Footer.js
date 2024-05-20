// src/components/Footer.js

import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: #f0f0f0;
  padding: 0.5rem;
  text-align: center;
  font-size: 0.8rem;
  border-top: 1px solid #ccc; 
  font-family: 'Lato', sans-serif;
`;

const FooterLink = styled.a`
  color: #007BFF;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Footer = () => (
  <FooterContainer>
    <p>© {new Date().getFullYear()} HyunJoon Sung. All Rights Reserved.</p>
    <p>
      <FooterLink href="https://github.com/sunghj1118">GitHub</FooterLink>
    </p>
  </FooterContainer>
);

export default Footer;
