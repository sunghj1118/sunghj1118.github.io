import React from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";
import styled from "styled-components";
import { Helmet } from "react-helmet";

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  font-family: 'Roboto', sans-serif;
`;

const Title = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 3rem;
  color: ${({ theme }) => theme.headings};
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 2rem;
  max-width: 600px;
  line-height: 1.6;
`;

const NavigationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 3rem;
  width: 100%;
  max-width: 800px;
`;

const NavCard = styled(Link)`
  background-color: ${({ theme }) => theme.postBg};
  color: ${({ theme }) => theme.text};
  padding: 2rem;
  border-radius: 10px;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 1px solid ${({ theme }) => theme.borderColor};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    border-color: ${({ theme }) => theme.links};
  }

  h3 {
    font-family: 'Montserrat', sans-serif;
    color: ${({ theme }) => theme.headings};
    margin-bottom: 0.5rem;
    font-size: 1.3rem;
  }

  p {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.text};
    margin: 0;
  }
`;

const HomePage = () => {
  return (
    <Layout>
      <Helmet>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap" rel="stylesheet" />
        <title>HyunJoon Sung - Developer Blog</title>
      </Helmet>

      <HeroContainer>
        <Title>Welcome to My Developer Blog</Title>
        <Subtitle>
          Hi, I'm HyunJoon Sung (@sunghj1118). I write about algorithms,
          infrastructure, AI, and software development. Explore my work below.
        </Subtitle>

        <NavigationGrid>
          <NavCard to="/blog">
            <h3>📜 Blog</h3>
            <p>Read my latest posts and technical articles</p>
          </NavCard>

          <NavCard to="/projects">
            <h3>🧪 Projects</h3>
            <p>Check out my experiments and side projects</p>
          </NavCard>

          <NavCard to="/hourglass">
            <h3>⏳ Hourglass</h3>
            <p>An interactive 3D timer visualization</p>
          </NavCard>

          <NavCard to="/status">
            <h3>⚔️ Status</h3>
            <p>View my current development stats</p>
          </NavCard>
        </NavigationGrid>

        <p style={{ marginTop: '3rem', fontSize: '0.9rem', opacity: 0.7 }}>
          Press 'M' to open the world map navigation
        </p>
      </HeroContainer>
    </Layout>
  );
};

export default HomePage;
