import React, { useEffect } from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { CouchIllustration, LampIllustration, DeskIllustration, PlantIllustration } from "../components/RoomFurniture";

// Color palette
const colors = {
  couch: "#C9BFAF",
  plant: "#4A5D4E",
  lamp: "#F2EEE4",
  wood: "#D9C5B2",
  shadow: "#9A9EAB",
  wall: "#E8E4DC",
  floor: "#B8AFA0",
  cardSurface: "#FFFFFF",
  panelSurface: "#FBF8F3",
  ink: "#3A332C",
  inkMuted: "#8A8078",
  cabinetLight: "#C9A27E",
  cabinetDark: "#A9825D",
  cabinetLeg: "#6B4F35",
  interior: "#F3E9D8",
};

const LivingRoomContainer = styled.div`
  height: 100vh;
  box-sizing: border-box;
  background: linear-gradient(to bottom, ${colors.wall} 0%, ${colors.floor} 100%);
  display: flex;
  flex-direction: column;
  padding: 40px 60px;
  position: relative;
  overflow: hidden;

  @media (max-width: 1024px) {
    height: auto;
    min-height: 100vh;
    padding: 20px;
  }
`;

const ContentRow = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  gap: 60px;
  flex: 1;
  min-height: 0;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 40px;
    min-height: auto;
    overflow-y: auto;
  }
`;

// Posts Panel — reads as a piece of furniture (a cabinet holding the posts),
// not a floating UI card: a flat wood frame with a recessed interior and
// short feet, in the same restrained flat-illustration language as the
// couch/lamp/desk. The cards inside stay exactly as flat, legible UI.
const PostsPanel = styled.div`
  flex: 1;
  max-width: 650px;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, ${colors.cabinetLight} 0%, ${colors.cabinetDark} 100%);
  border-radius: 18px;
  padding: 14px 14px 20px;
  box-shadow: 0 20px 50px rgba(60, 40, 20, 0.25);
  position: relative;

  /* short furniture feet, matching the couch/desk leg treatment */
  &::before,
  &::after {
    content: '';
    position: absolute;
    bottom: -14px;
    width: 14px;
    height: 16px;
    background: ${colors.cabinetLeg};
    border-radius: 0 0 4px 4px;
  }
  &::before {
    left: 26px;
  }
  &::after {
    right: 26px;
  }

  @media (max-width: 1024px) {
    max-width: 100%;
    height: auto;
    min-height: 500px;
  }
`;

// The recessed interior — like the back panel of an open shelf unit — where
// the post cards actually sit.
const PanelInterior = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  background: ${colors.interior};
  border-radius: 12px;
  padding: 20px 18px;
  box-shadow: inset 0 3px 8px rgba(60, 40, 20, 0.16);
`;

const PanelLabel = styled.div`
  font-family: 'Poppins', sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: ${colors.inkMuted};
  margin: 0 0 18px 4px;
`;

const PostsScroll = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding-right: 4px;
  scrollbar-width: thin;
  scrollbar-color: rgba(58, 51, 44, 0.25) transparent;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(58, 51, 44, 0.2);
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(58, 51, 44, 0.35);
  }

  @media (max-width: 1024px) {
    overflow-y: visible;
  }
`;

// A genuine wrapping grid — an item either fully fits on the current row or
// wraps whole onto the next one. No manual width math, no partial items.
const PostsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  gap: 16px;
`;

const PostCard = styled(Link)`
  width: 168px;
  min-height: 132px;
  display: flex;
  flex-direction: column;
  background: ${colors.cardSurface};
  border-radius: 14px;
  text-decoration: none;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(60, 45, 30, 0.10);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  cursor: pointer;

  &:hover {
    text-decoration: none;
    transform: translateY(-6px);
    box-shadow: 0 18px 34px rgba(60, 45, 30, 0.20);
  }
`;

const PostCardAccent = styled.div`
  height: 7px;
  background: ${props => props.color};
`;

const PostCardBody = styled.div`
  padding: 14px 14px 16px;
  display: flex;
  flex-direction: column;
`;

const PostCardTitle = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: ${colors.ink};
  margin: 0;
  line-height: 1.35;
`;

const PostCardExcerpt = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  color: ${colors.inkMuted};
  line-height: 1.5;
  margin: 0;
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: max-height 0.3s ease, opacity 0.25s ease, margin-top 0.3s ease;

  ${PostCard}:hover & {
    max-height: 90px;
    opacity: 1;
    margin-top: 8px;
  }
`;

const PostCardMeta = styled.div`
  margin-top: 10px;
  font-family: 'Roboto', sans-serif;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.4px;
  color: ${props => props.color};
`;

const ViewAllButton = styled(Link)`
  display: block;
  margin: 20px auto 0;
  padding: 12px 24px;
  background: ${colors.ink};
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-family: 'Poppins', sans-serif;
  text-align: center;
  font-weight: 600;
  transition: all 0.3s ease;
  max-width: 200px;

  &:hover {
    text-decoration: none;
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
  gap: 24px;
  position: relative;
`;

const DeskLink = styled(Link)`
  display: block;
  text-decoration: none;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
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

// Accent color generator based on index (stands in for real per-category
// colors until that mapping exists)
const getAccentColor = (index) => {
  const accentColors = [
    '#8B4513', '#A0522D', '#D2691E', '#CD853F', '#B8860B',
    '#8B7355', '#A0826D', '#BC5D5D', '#C19A6B', '#6B7F5D',
    '#6B4423', '#7B5544', '#8B6655', '#9B5766', '#4E6B7B',
    '#5D4E37', '#7D6E57', '#5E7D8E', '#9D6E77', '#5D7D57',
  ];
  return accentColors[index % accentColors.length];
};

// Truncate title intelligently
const truncateTitle = (title, maxLength = 40) => {
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
  // The room is a fixed-height scene, not a scrollable page — only the
  // posts panel scrolls internally. Lock page scroll while this page is
  // mounted and restore it on navigation to any other (normally-scrolling) page.
  useEffect(() => {
    const { body, documentElement: html } = document;
    const prevBodyOverflow = body.style.overflow;
    const prevHtmlOverflow = html.style.overflow;
    body.style.overflow = 'hidden';
    html.style.overflow = 'hidden';

    return () => {
      body.style.overflow = prevBodyOverflow;
      html.style.overflow = prevHtmlOverflow;
    };
  }, []);

  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout fullWidth={true}>
      <Helmet>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap" rel="stylesheet" />
        <title>HyunJoon Sung - Welcome to My Living Room</title>
      </Helmet>

      <LivingRoomContainer>
        <ContentRow>
          {/* Posts Panel - Left Side */}
          <PostsPanel>
            <PanelInterior>
              <PanelLabel>Latest Posts</PanelLabel>
              <PostsScroll>
                <PostsGrid>
                  {posts.map(({ node }, index) => {
                    const accentColor = getAccentColor(index);

                    return (
                      <PostCard key={node.id} to={node.fields.slug}>
                        <PostCardAccent color={accentColor} />
                        <PostCardBody>
                          <PostCardTitle>{truncateTitle(node.frontmatter.title)}</PostCardTitle>
                          <PostCardExcerpt>
                            {node.excerpt || 'Click to read more...'}
                          </PostCardExcerpt>
                          <PostCardMeta color={accentColor}>
                            {new Date(node.frontmatter.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </PostCardMeta>
                        </PostCardBody>
                      </PostCard>
                    );
                  })}
                </PostsGrid>
              </PostsScroll>
              <ViewAllButton to="/blog">View All Posts →</ViewAllButton>
            </PanelInterior>
          </PostsPanel>

          {/* Furniture - Right Side */}
          <FurnitureContainer>
            <CouchArea>
              <PlantIllustration width={64} height={104} />

              <DeskLink to="/hourglass">
                <DeskIllustration width={90} height={90} />
              </DeskLink>

              <CouchIllustration width={170} height={126} />

              <LampIllustration width={80} height={168} />
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
