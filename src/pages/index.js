import React, { useState, useEffect, useRef } from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import styled from "styled-components";
import { Helmet } from "react-helmet";

// Color palette
const colors = {
  couch: "#C9BFAF",
  plant: "#4A5D4E",
  lamp: "#F2EEE4",
  wood: "#D9C5B2",
  shadow: "#9A9EAB",
  wall: "#E8E4DC",
  floor: "#B8AFA0",
};

const LivingRoomContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom, ${colors.wall} 0%, ${colors.floor} 100%);
  display: flex;
  flex-direction: column;
  padding: 40px 60px;
  position: relative;
  overflow: hidden;

  @media (max-width: 1024px) {
    padding: 20px;
  }
`;

const WelcomeText = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 2rem;
  color: ${colors.shadow};
  text-align: center;
  margin: 0 0 40px 0;
  z-index: 10;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
`;

const ContentRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 60px;
  flex: 1;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 40px;
  }
`;

// Bookshelf Section
const BookshelfContainer = styled.div`
  flex: 1;
  max-width: 650px;
  background:
    linear-gradient(90deg,
      ${colors.wood} 0%,
      #D4C4B0 25%,
      #CDB5A0 50%,
      #D4C4B0 75%,
      ${colors.wood} 100%
    );
  border-radius: 8px;
  padding: 40px 25px 30px;
  box-shadow:
    0 15px 50px rgba(0, 0, 0, 0.3),
    inset 0 2px 4px rgba(255, 255, 255, 0.1),
    inset 0 -3px 8px rgba(0, 0, 0, 0.2);
  position: relative;
  min-height: 550px;
  border: 3px solid rgba(139, 90, 43, 0.3);

  /* Wood grain effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 2px,
        rgba(0, 0, 0, 0.03) 2px,
        rgba(0, 0, 0, 0.03) 4px
      );
    border-radius: 8px;
    pointer-events: none;
  }

  @media (max-width: 1024px) {
    max-width: 100%;
    min-height: 450px;
  }
`;

const ShelfRow = styled.div`
  margin-bottom: 30px;
  position: relative;
  padding: 8px 0 18px;
  background: linear-gradient(to bottom,
    transparent 0%,
    transparent 85%,
    rgba(139, 90, 43, 0.15) 85%,
    rgba(101, 67, 33, 0.25) 100%
  );
  border-bottom: 4px solid rgba(101, 67, 33, 0.4);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);

  &:last-child {
    border-bottom: 4px solid rgba(101, 67, 33, 0.3);
  }

  /* Shelf depth effect */
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(to right,
      transparent,
      rgba(255, 255, 255, 0.2) 50%,
      transparent
    );
  }
`;

const BookWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin: 0;
  z-index: 1;

  &:hover {
    z-index: 100;
  }
`;

const BookSpine = styled(Link)`
  display: inline-block;
  width: ${props => props.width || '50px'};
  height: 150px;
  background: ${props => props.color};
  margin: 0;
  position: relative;
  text-decoration: none;
  border-radius: 2px;
  box-shadow:
    2px 0 5px rgba(0, 0, 0, 0.2),
    inset -2px 0 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease;
  cursor: pointer;

  ${BookWrapper}:hover & {
    opacity: 0;
  }

  &::before {
    content: '';
    position: absolute;
    top: 8px;
    left: 4px;
    right: 4px;
    height: 2px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 1px;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 8px;
    left: 4px;
    right: 4px;
    height: 2px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 1px;
  }
`;

const BookCover = styled(Link)`
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 180px;
  height: 240px;
  background: ${props => props.color};
  border-radius: 4px;
  padding: 20px;
  box-shadow:
    0 10px 40px rgba(0, 0, 0, 0.4),
    inset 0 0 0 2px rgba(255, 255, 255, 0.1);
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease, transform 0.3s ease;

  ${BookWrapper}:hover & {
    opacity: 1;
    pointer-events: auto;
    transform: translateX(-50%) translateY(-20px) scale(1.05);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.2) 0%,
      transparent 50%,
      rgba(0, 0, 0, 0.1) 100%
    );
    border-radius: 4px;
    pointer-events: none;
  }
`;

const BookTitle = styled.span`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) rotate(-90deg);
  font-family: 'Poppins', sans-serif;
  font-size: 7px;
  font-weight: 700;
  color: white;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  white-space: nowrap;
  max-width: 130px;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: 0.3px;
`;

const BookDate = styled.span`
  position: absolute;
  left: 50%;
  bottom: 20px;
  transform: translateX(-50%);
  font-family: 'Roboto', sans-serif;
  font-size: 8px;
  color: rgba(255, 255, 255, 0.8);
  writing-mode: vertical-rl;
  text-orientation: mixed;
`;

const CoverTitle = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  margin: 0;
  line-height: 1.3;
  word-wrap: break-word;
  position: relative;
  z-index: 1;
`;

const CoverDate = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.9);
  margin-top: auto;
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  z-index: 1;
`;

const CoverExcerpt = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.4;
  margin: 10px 0 0 0;
  position: relative;
  z-index: 1;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
`;

const BooksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0;
  justify-content: center;
  align-items: flex-end;
  padding: 0 20px;
`;

const ViewAllButton = styled(Link)`
  display: block;
  margin: 20px auto 0;
  padding: 12px 24px;
  background: ${colors.shadow};
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-family: 'Poppins', sans-serif;
  text-align: center;
  font-weight: 600;
  transition: all 0.3s ease;
  max-width: 200px;

  &:hover {
    background: ${colors.plant};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

// Furniture Section
const FurnitureContainer = styled.div`
  flex: 1;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  position: relative;

  @media (max-width: 1024px) {
    max-width: 100%;
  }
`;

const CouchArea = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 20px;
  position: relative;
`;

const Desk = styled(Link)`
  width: 100px;
  height: 80px;
  background: ${colors.wood};
  border-radius: 8px 8px 0 0;
  position: relative;
  box-shadow:
    0 8px 20px rgba(0, 0, 0, 0.2),
    inset 0 -2px 5px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  &::before {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 10px;
    width: 8px;
    height: 20px;
    background: ${colors.wood};
    box-shadow: 2px 0 4px rgba(0, 0, 0, 0.2);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    right: 10px;
    width: 8px;
    height: 20px;
    background: ${colors.wood};
    box-shadow: 2px 0 4px rgba(0, 0, 0, 0.2);
  }
`;

const Hourglass = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 40px;
  background: linear-gradient(to bottom, transparent 0%, transparent 45%, ${colors.shadow} 45%, ${colors.shadow} 55%, transparent 55%, transparent 100%);

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
  }

  &::before {
    top: 0;
    border-top: 18px solid rgba(255, 215, 0, 0.3);
  }

  &::after {
    bottom: 0;
    border-bottom: 18px solid rgba(255, 215, 0, 0.3);
  }
`;

const Couch = styled.div`
  width: 180px;
  height: 100px;
  background: ${colors.couch};
  border-radius: 20px;
  position: relative;
  box-shadow:
    0 15px 40px rgba(0, 0, 0, 0.3),
    inset 0 -5px 15px rgba(0, 0, 0, 0.1);

  &::before {
    content: '';
    position: absolute;
    top: -30px;
    left: 10px;
    right: 10px;
    height: 40px;
    background: ${colors.couch};
    border-radius: 15px 15px 0 0;
    box-shadow: inset 0 3px 8px rgba(0, 0, 0, 0.1);
  }

  &::after {
    content: '';
    position: absolute;
    top: -20px;
    left: 20px;
    width: 50px;
    height: 25px;
    background: linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%);
    border-radius: 8px;
  }
`;

const CouchLeg = styled.div`
  position: absolute;
  bottom: -15px;
  width: 12px;
  height: 15px;
  background: ${colors.wood};
  border-radius: 0 0 4px 4px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);

  &:nth-child(1) {
    left: 20px;
  }

  &:nth-child(2) {
    right: 20px;
  }
`;

const Cushion = styled.div`
  position: absolute;
  top: -25px;
  right: 20px;
  width: 45px;
  height: 30px;
  background: #A8D8B9;
  border-radius: 8px;
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.2),
    inset -2px -2px 5px rgba(0, 0, 0, 0.1);
  transform: rotate(-5deg);
`;

const Lamp = styled.div`
  width: 40px;
  height: 120px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 6px;
    height: 90px;
    background: linear-gradient(to bottom, ${colors.wood} 0%, ${colors.shadow} 100%);
    border-radius: 3px;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 40px;
    background: ${colors.lamp};
    border-radius: 50% 50% 45% 45%;
    box-shadow:
      0 -5px 20px rgba(255, 200, 100, 0.4),
      0 8px 15px rgba(0, 0, 0, 0.2);
  }
`;

const LampBase = styled.div`
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 15px;
  background: ${colors.wood};
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const NavigationHint = styled.p`
  text-align: center;
  font-family: 'Roboto', sans-serif;
  font-size: 0.85rem;
  color: ${colors.shadow};
  margin-top: 30px;
  opacity: 0.7;
`;

const MapHint = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-family: 'Poppins', sans-serif;
  font-size: 0.75rem;
  color: ${colors.shadow};
  opacity: 0.6;
  text-align: right;
`;

// Book color generator based on index
const getBookColor = (index) => {
  const bookColors = [
    '#8B4513', '#A0522D', '#D2691E', '#CD853F', '#DEB887',
    '#8B7355', '#A0826D', '#BC8F8F', '#C19A6B', '#D2B48C',
    '#6B4423', '#7B5544', '#8B6655', '#9B7766', '#AB8877',
    '#5D4E37', '#7D6E57', '#8D7E67', '#9D8E77', '#AD9E87',
  ];
  return bookColors[index % bookColors.length];
};

// Truncate title intelligently
const truncateTitle = (title, maxLength = 25) => {
  if (title.length <= maxLength) return title;

  // Try to truncate at a word boundary
  const truncated = title.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');

  if (lastSpace > maxLength * 0.6) {
    return truncated.substring(0, lastSpace) + '...';
  }

  return truncated + '...';
};

const HomePage = ({ data }) => {
  const bookshelfRef = useRef(null);
  const [booksPerShelf, setBooksPerShelf] = useState(8);
  const [totalBooks, setTotalBooks] = useState(24);

  // Calculate how many books fit based on shelf width
  useEffect(() => {
    const calculateBooks = () => {
      if (bookshelfRef.current) {
        const shelfWidth = bookshelfRef.current.offsetWidth;
        const padding = 40; // 20px on each side
        const availableWidth = shelfWidth - padding;
        const maxBookWidth = 65; // Use max width (45-65px range) for conservative calculation
        const buffer = 10; // Extra buffer to prevent overflow

        // Calculate books per shelf conservatively
        const booksPerRow = Math.floor((availableWidth - buffer) / maxBookWidth);
        const actualBooksPerShelf = Math.max(4, Math.min(booksPerRow, 12)); // Min 4, max 12 per shelf

        setBooksPerShelf(actualBooksPerShelf);
        setTotalBooks(actualBooksPerShelf * 3); // 3 shelves
      }
    };

    calculateBooks();

    // Recalculate on window resize
    const handleResize = () => calculateBooks();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get posts based on calculated total
  const posts = data.allMarkdownRemark.edges.slice(0, totalBooks);

  // Split into 3 shelves
  const shelves = [
    posts.slice(0, booksPerShelf),
    posts.slice(booksPerShelf, booksPerShelf * 2),
    posts.slice(booksPerShelf * 2, booksPerShelf * 3),
  ];

  return (
    <Layout fullWidth={true}>
      <Helmet>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap" rel="stylesheet" />
        <title>HyunJoon Sung - Welcome to My Living Room</title>
      </Helmet>

      <LivingRoomContainer>
        <WelcomeText>안녕하세요! 블로그입니다.</WelcomeText>

        <ContentRow>
          {/* Bookshelf - Left Side */}
          <BookshelfContainer ref={bookshelfRef}>
          {shelves.map((shelf, shelfIndex) => (
            <ShelfRow key={shelfIndex}>
              <BooksContainer>
                {shelf.map(({ node }, bookIndex) => {
                  const globalIndex = shelfIndex * booksPerShelf + bookIndex;
                  const bookColor = getBookColor(globalIndex);
                  const bookWidth = `${45 + (globalIndex % 3) * 10}px`;

                  return (
                    <BookWrapper key={node.id}>
                      <BookSpine
                        to={node.fields.slug}
                        color={bookColor}
                        width={bookWidth}
                      >
                        <BookTitle>{truncateTitle(node.frontmatter.title)}</BookTitle>
                        <BookDate>
                          {new Date(node.frontmatter.date).toLocaleDateString('en-US', {
                            month: 'short',
                            year: 'numeric'
                          })}
                        </BookDate>
                      </BookSpine>
                      <BookCover
                        to={node.fields.slug}
                        color={bookColor}
                      >
                        <CoverTitle>{node.frontmatter.title}</CoverTitle>
                        <CoverExcerpt>
                          {node.excerpt || 'Click to read more...'}
                        </CoverExcerpt>
                        <CoverDate>
                          {new Date(node.frontmatter.date).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </CoverDate>
                      </BookCover>
                    </BookWrapper>
                  );
                })}
              </BooksContainer>
            </ShelfRow>
          ))}
          <ViewAllButton to="/blog">View All Posts →</ViewAllButton>
        </BookshelfContainer>

        {/* Furniture - Right Side */}
        <FurnitureContainer>
          <CouchArea>
            <Desk to="/hourglass">
              <Hourglass />
            </Desk>

            <Couch>
              <CouchLeg />
              <CouchLeg />
              <Cushion />
            </Couch>

            <Lamp>
              <LampBase />
            </Lamp>
          </CouchArea>

          <NavigationHint>
            Click the desk to see the hourglass | Press 'M' for the world map
          </NavigationHint>
        </FurnitureContainer>
        </ContentRow>

        <MapHint>
          Press 'M' to explore →
        </MapHint>
      </LivingRoomContainer>
    </Layout>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      limit: 40
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 120)
          fields {
            slug
          }
          frontmatter {
            title
            date
          }
        }
      }
    }
  }
`;

export default HomePage;
