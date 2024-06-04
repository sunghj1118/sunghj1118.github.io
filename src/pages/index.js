import React, { useState } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import styled, { createGlobalStyle } from "styled-components"
import { Helmet } from "react-helmet"

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
`

const TagButton = styled.button`
  background-color: ${props => (props.selected ? '#6c757d' : '#e9ecef')}; // Main Tag Button colors
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
    background-color: #6c757d; // Main Tag Button hover color
    color: #ffffff;
    transform: scale(1.05);
  }
`

const SmallTagButton = styled(TagButton)`
  background-color: ${props => (props.selected ? '#495057' : '#dee2e6')}; // Sub Tag Button colors
  font-size: 12px; /* Smaller size */
  padding: 2px 12px; /* Smaller padding */
`

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
`

const IndexPage = ({ data }) => {
  const [selectedTags, setSelectedTags] = useState([])

  const toggleTag = tag => {
    setSelectedTags(prevTags =>
      prevTags.includes(tag) ? prevTags.filter(t => t !== tag) : [...prevTags, tag]
    )
  }

  const posts = data.allMarkdownRemark.edges.filter(({ node }) =>
    selectedTags.length === 0 || selectedTags.every(tag => node.frontmatter.tags.includes(tag))
  )

  const tagsWithSubTags = {
    Blog: ['Gatsby', 'NPM'],
    Infra: ['Kubernetes', 'Docker', 'Container'],
    AI: []
  }

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
      <h2>Posts</h2>
      <PostContainer>
        {posts.map(({ node }) => (
          <div key={node.id}>
            <h3>
              <a href={node.fields.slug}>{node.frontmatter.title}</a>
            </h3>
            <p>{node.frontmatter.date}</p>
            <p>{node.excerpt}</p>
            <div>
              {node.frontmatter.tags.map(tag => (
                <SmallTagButton key={tag} onClick={() => toggleTag(tag)}>
                  {tag}
                </SmallTagButton>
              ))}
            </div>
            <hr />
          </div>
        ))}
      </PostContainer>
    </Layout>
  )
}

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
`

export default IndexPage
