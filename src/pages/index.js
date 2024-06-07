import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import styled, { createGlobalStyle } from "styled-components";
import { Helmet } from "react-helmet";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f8f9fa; // Very light grey background
    color: #212529; // Dark grey text
    font-family: 'Roboto', sans-serif; // Default font
    margin: 0;
    padding: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Montserrat', sans-serif; // Headings font
    color: #212529; // Dark grey color for headings
  }

  button {
    font-family: 'Poppins', sans-serif; // Button font
  }

  a {
    color: #495057; // Link color
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const TagButton = styled.button`
  background-color: ${props => (props.selected ? '#595f39' : '#e9ecef')}; // Main Tag Button colors
  border: none;
  border-radius: 20px;
  color: ${props => (props.selected ? '#ffffff' : '#212529')}; // Text color
  font-family: 'Poppins', sans-serif;
  font-size: 14px; /* Adjusted size */
  margin: 4px;
  padding: 6px 16px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, transform 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #595f39; // Main Tag Button hover color
    color: #ffffff;
    transform: scale(1.05);
  }
`;

const SmallTagButton = styled(TagButton)`
  background-color: ${props => (props.selected ? '#495057' : '#dee2e6')}; // Sub Tag Button colors
  font-size: 12px; /* Smaller size */
  padding: 2px 12px; /* Smaller padding */
`;

const SubTagContainer = styled.div`
  display: none;
  justify-content: center;
  flex-wrap: nowrap;
  position: absolute;
  top: 50px; /* Increased space between the main tag and sub tags */
  left: 50%;
  transform: translateX(-50%);
  background-color: #e9ecef; // Sub Tag Container color
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    top: -10px; /* Position the triangle */
    left: 50%;
    transform: translateX(-50%);
    border-width: 0 10px 10px 10px;
    border-style: solid;
    border-color: transparent transparent #e9ecef transparent; // Triangle color
  }
`;

const MainTagContainer = styled.div`
  position: relative;
  margin: 8px;

  &:hover ${SubTagContainer}, ${SubTagContainer}:hover {
    display: flex;
  }
`;

const TagWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const SelectedTagsWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const SelectedTagsTitle = styled.h3`
  font-size: 16px;
  text-align: left;
  font-family: 'Montserrat', sans-serif; // Headings font
  color: #212529; // Dark grey color for headings
  margin-top: 20px;
  margin-bottom: 10px;
  width: 100%;
`;

const PostContainer = styled.div`
  margin: 20px 0;
  font-family: 'Roboto', sans-serif;
  background-color: #f8f9fa; // Background color for the posts container
  padding: 20px; // Optional padding for better spacing
  border-radius: 10px; // Optional border radius for a softer look

  h3 {
    font-size: 14px;
    margin: 0;
    a {
      color: #495057; // Link color
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }

  p {
    font-size: 12px;
    color: #212529; // Text color
  }

  hr {
    border: 0;
    border-top: 1px solid #dee2e6;
    margin: 10px 0;
  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const PaginationButton = styled.button`
  background-color: ${props => (props.active ? '#495057' : '#e9ecef')};
  border: none;
  border-radius: 5px;
  color: ${props => (props.active ? '#ffffff' : '#212529')};
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  margin: 4px;
  padding: 6px 12px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #495057;
    color: #ffffff;
  }
`;

const FixedTagWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  display: ${props => (props.visible ? 'none' : 'flex')};
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 1000;

  button {
    font-size: 12px; /* Smaller size */
    padding: 4px 8px; /* Smaller padding */
    margin: 2px 0;
    width: 100%; /* Make all buttons the same width */
  }
`;

const FixedTagTitle = styled.h3`
  font-size: 14px;
  font-family: 'Montserrat', sans-serif;
  color: #212529;
  margin-bottom: 10px;
`;

const IndexPage = ({ data }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFixedTags, setShowFixedTags] = useState(false);

  const POSTS_PER_PAGE = 15;

  useEffect(() => {
    const handleScroll = () => {
      setShowFixedTags(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleTag = tag => {
    setSelectedTags(prevTags =>
      prevTags.includes(tag) ? prevTags.filter(t => t !== tag) : [...prevTags, tag]
    );
    setCurrentPage(1); // Reset to first page on tag change
  };

  const filteredPosts = data.allMarkdownRemark.edges.filter(({ node }) =>
    selectedTags.length === 0 || selectedTags.every(tag => node.frontmatter.tags.includes(tag))
  );

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  const tagsWithSubTags = {
    Blog: ['Gatsby', 'NPM', 'Github'],
    Infra: ['Kubernetes', 'Docker', 'Container'],
    Algorithm: ['DP', 'Sort', 'Log'],
    CS: ['Architecture'],
    AI: []
  };

  return (
    <Layout>
      <Helmet>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap" rel="stylesheet" />
      </Helmet>
      <GlobalStyle />
      <h2 style={{ textAlign: "center" }}>Tags</h2>
      <TagWrapper>
        {Object.keys(tagsWithSubTags).map(tag => (
          <MainTagContainer key={tag}>
            <TagButton
              onClick={() => toggleTag(tag)}
              selected={selectedTags.includes(tag)}
            >
              {tag} ({data.tags.group.find(t => t.fieldValue === tag)?.totalCount || 0})
            </TagButton>
            {tagsWithSubTags[tag].length > 0 && (
              <SubTagContainer>
                {tagsWithSubTags[tag].map(subTag => (
                  <TagButton
                    key={subTag}
                    onClick={() => toggleTag(subTag)}
                    selected={selectedTags.includes(subTag)}
                  >
                    {subTag}
                  </TagButton>
                ))}
              </SubTagContainer>
            )}
          </MainTagContainer>
        ))}
      </TagWrapper>
      {selectedTags.length > 0 && (
        <>
          <SelectedTagsTitle>Selected Tags</SelectedTagsTitle>
          <SelectedTagsWrapper>
            {selectedTags.map(tag => (
              <SmallTagButton
                key={tag}
                onClick={() => toggleTag(tag)}
                selected={true}
              >
                {tag}
              </SmallTagButton>
            ))}
          </SelectedTagsWrapper>
        </>
      )}
      <h2>Posts</h2>
      <PostContainer>
        {paginatedPosts.map(({ node }) => (
          <div key={node.id}>
            <h3>
              <a href={node.fields.slug}>{node.frontmatter.title}</a>
            </h3>
            <p>{node.frontmatter.date}</p>
            <p>{node.excerpt}</p>
            <div>
              {node.frontmatter.tags.map(tag => (
                <SmallTagButton
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  selected={selectedTags.includes(tag)}
                >
                  {tag}
                </SmallTagButton>
              ))}
            </div>
            <hr />
          </div>
        ))}
      </PostContainer>
      <PaginationWrapper>
        {Array.from({ length: totalPages }, (_, index) => (
          <PaginationButton
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </PaginationButton>
        ))}
      </PaginationWrapper>
      <FixedTagWrapper visible={!showFixedTags}>
        <FixedTagTitle>Tags</FixedTagTitle>
        {Object.keys(tagsWithSubTags).map(tag => (
          <TagButton
            key={tag}
            onClick={() => toggleTag(tag)}
            selected={selectedTags.includes(tag)}
          >
            {tag}
          </TagButton>
        ))}
      </FixedTagWrapper>
    </Layout>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            tags
          }
          excerpt
        }
      }
    }
    tags: allMarkdownRemark {
      group(field: { frontmatter: { tags: SELECT } }) {
        fieldValue
        totalCount
      }
    }
  }
`;

export default IndexPage;
