// src/components/Footer.js

import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  /* CHANGED: Use theme variables */
  background: ${({ theme }) => theme.postBg}; 
  color: ${({ theme }) => theme.text};
  border-top: 1px solid ${({ theme }) => theme.borderColor};

  /* Unchanged styles */
  padding: 0.5rem;
  text-align: center;
  font-size: 0.8rem;
  font-family: 'Lato', sans-serif;
  transition: all 0.30s linear; /* Added transition */
`;

const FooterLink = styled.a`
  /* CHANGED: Use theme variable */
  color: ${({ theme }) => theme.links};

  /* Unchanged styles */
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