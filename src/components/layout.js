import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { lightTheme, darkTheme } from './theme'; 
import Container from './Container'; 
import Footer from './Footer'; 
import './layout.css'; 

const GlobalStyle = createGlobalStyle`
  body {
    --theme-body: ${({ theme }) => theme.body};
    --theme-text: ${({ theme }) => theme.text};
    --theme-headings: ${({ theme }) => theme.headings};
    --theme-links: ${({ theme }) => theme.links};
    --theme-borderColor: ${({ theme }) => theme.borderColor};
    --theme-postBg: ${({ theme }) => theme.postBg};

    background-color: var(--theme-body);
    color: var(--theme-text);
    transition: all 0.30s linear;
  }

  h1, h2, h3, h4, h5, h6 {
    color: var(--theme-headings);
  }
  
  a {
    color: var(--theme-links);
  }

  hr {
    border: 0;
    border-top: 1px solid var(--theme-borderColor);
  }
`;

const ThemeButton = styled.button`
  margin: 10px;
  padding: 8px 12px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.postBg}; 
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const Layout = ({ children }) => {
  // 3. Lazy State Initialization 
  // This function runs only once on mount to determine the initial theme
  const [theme, setTheme] = useState(() => {
    // Check local storage first
    const savedTheme = typeof window !== 'undefined' ? window.localStorage.getItem('theme') : null;
    if (savedTheme) {
      return savedTheme;
    }
    // If no local storage, check OS system preference
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    // Default fallback
    return 'light';
  });

  // 4. Toggle Function
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    window.localStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <>
        <GlobalStyle />
        
        <Container>
          {/* Header area could go here */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <ThemeButton onClick={toggleTheme}>
               {theme === 'light' ? '🌙 ' : '☀️ '}
            </ThemeButton>
          </div>

          <div className="markdown-body">
            {children}
          </div>
        </Container>
        <Footer />
      </>
    </ThemeProvider>
  );
};

export default Layout;