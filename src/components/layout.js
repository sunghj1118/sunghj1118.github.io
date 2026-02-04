import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { Link } from 'gatsby';
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
    margin: 0;
    padding: 0;
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

  @keyframes mapPopIn {
    from { transform: scale(0.8); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }

  .dollhouse-scroll-area::-webkit-scrollbar {
    height: 8px;
  }
  .dollhouse-scroll-area::-webkit-scrollbar-track {
    background: #111;
  }
  .dollhouse-scroll-area::-webkit-scrollbar-thumb {
    background: #d4af37;
    border-radius: 4px;
  }
`;

const ThemeButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 8px 12px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.postBg}; 
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  z-index: 10;

  &:hover {
    opacity: 0.8;
  }
`;

// --- Map Component (Dollhouse Style) ---
const MapOverlay = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const rooms = [
    { name: "Home", description: "Return to the main page", path: "/", icon: "🏠" },
    { name: "The Archive", description: "Read my latest posts", path: "/blog", icon: "📜" },
    { name: "The Status Screen", description: "View my current stats", path: "/status", icon: "⚔️" },
    { name: "The Hourglass", description: "Time is ticking...", path: "/hourglass", icon: "⏳" },
    { name: "The Lab", description: "Projects and experiments", path: "/projects", icon: "🧪" },
  ];

  return (
    <div style={mapStyles.overlay} onClick={onClose}>
      <div 
        style={mapStyles.dollhouseContainer} 
        onClick={(e) => e.stopPropagation()} 
      >
        <div style={mapStyles.header}>
          <h3 style={mapStyles.title}>World Map</h3>
          <p style={mapStyles.subtitle}>Select a room to teleport</p>
        </div>

        <div className="dollhouse-scroll-area" style={mapStyles.scrollArea}>
          <div style={mapStyles.roomsFlex}>
            {rooms.map((room) => (
              <Link 
                key={room.path} 
                to={room.path} 
                onClick={onClose} 
                style={mapStyles.roomBox}
              >
                <div style={mapStyles.roomIcon}>{room.icon}</div>
                <div style={mapStyles.roomName}>{room.name}</div>
                <div style={mapStyles.roomDesc}>{room.description}</div>
              </Link>
            ))}
          </div>
        </div>

        <button onClick={onClose} style={mapStyles.closeButton}>
          Press 'M' or Click Outside to Exit
        </button>
      </div>
    </div>
  );
};

const mapStyles = {
  overlay: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)', zIndex: 9999,
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    backdropFilter: 'blur(8px)', fontFamily: "'Courier New', Courier, monospace",
  },
  dollhouseContainer: {
    width: '90vw', maxWidth: '1000px', backgroundColor: '#1a1a1a',
    border: '4px double #d4af37', borderRadius: '15px', padding: '40px 20px',
    boxShadow: '0 0 50px rgba(212, 175, 55, 0.3)', animation: 'mapPopIn 0.3s ease-out forwards',
  },
  header: { textAlign: 'center', marginBottom: '30px' },
  title: { color: '#d4af37', fontSize: '2.5rem', margin: 0, textTransform: 'uppercase', letterSpacing: '5px' },
  subtitle: { color: '#888', marginTop: '5px' },
  scrollArea: { overflowX: 'auto', padding: '20px 0' },
  roomsFlex: { display: 'flex', gap: '30px', padding: '0 20px', width: 'max-content' },
  roomBox: {
    width: '220px', height: '280px', backgroundColor: '#2a2a2a', border: '2px solid #444',
    borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center',
    justifyContent: 'center', textDecoration: 'none', transition: 'all 0.2s ease',
    cursor: 'pointer', color: 'white', textAlign: 'center', padding: '15px',
  },
  roomIcon: { fontSize: '4rem', marginBottom: '15px' },
  roomName: { fontSize: '1.2rem', fontWeight: 'bold', color: '#d4af37', marginBottom: '10px' },
  roomDesc: { fontSize: '0.8rem', color: '#bbb' },
  closeButton: {
    marginTop: '30px', display: 'block', margin: '30px auto 0',
    backgroundColor: 'transparent', color: '#888', border: 'none', cursor: 'pointer', fontSize: '0.9rem',
  }
};

const Layout = ({ children, fullWidth = false }) => {
  const [isMapOpen, setIsMapOpen] = useState(false);

  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = window.localStorage.getItem('theme');
      if (savedTheme) return savedTheme;
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    }
    return 'light';
  });

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('theme', newTheme);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key.toLowerCase() === 'm') {
        setIsMapOpen(prev => !prev);
      }
      if (event.key === 'Escape' && isMapOpen) {
        setIsMapOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMapOpen]);

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <div style={{ position: 'relative', minHeight: '100vh' }}>
        <GlobalStyle />

        <ThemeButton onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </ThemeButton>

        {fullWidth ? (
          children
        ) : (
          <Container>
            <div className="markdown-body">
              {children}
            </div>
          </Container>
        )}

        <Footer />

        <MapOverlay
          isOpen={isMapOpen}
          onClose={() => setIsMapOpen(false)}
        />

        {/* Small Game Hint */}
        {!isMapOpen && (
          <div style={{
            position: 'fixed', bottom: '20px', right: '20px',
            fontSize: '0.7rem', color: '#888', fontFamily: 'monospace',
            pointerEvents: 'none', opacity: 0.6
          }}>
            [ PRESS 'M' FOR MAP ]
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export default Layout;