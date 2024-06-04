import React, { useState } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import styled from "styled-components"
import { Helmet } from "react-helmet"

const TagButton = styled.button`
  background-color: ${props => (props.selected ? '#007BFF' : '#E0E0E0')};
  border: none;
  border-radius: 20px;
  color: ${props => (props.selected ? '#FFFFFF' : '#333333')};
  font-family: 'Poppins', sans-serif;
  font-size: 14px; /* Adjusted size */
  margin: 4px;
  padding: 6px 16px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, transform 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #007BFF;
    color: #FFFFFF;
    transform: scale(1.05);
  }
`

const SmallTagButton = styled(TagButton)`
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
  background-color: #f5f5f5;
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
    border-color: transparent transparent #f5f5f5 transparent;
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

  h3 {
    font-size: 14px;
    margin: 0;
    a {
      color: #6200ea;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }

  p {
    font-size: 12px;
    color: #666;
  }

  hr {
    border: 0;
    border-top: 1px solid #ddd;
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
      </Helmet>
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
