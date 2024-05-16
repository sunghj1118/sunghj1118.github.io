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
    margin: 20px 0;
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

  return (
    <Layout>
      <Helmet>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap" rel="stylesheet" />
      </Helmet>
      <h2>Tags</h2>
      <div>
        {data.tags.group.map(tag => (
          <TagButton
            key={tag.fieldValue}
            onClick={() => toggleTag(tag.fieldValue)}
            selected={selectedTags.includes(tag.fieldValue)}
          >
            {tag.fieldValue} ({tag.totalCount})
          </TagButton>
        ))}
      </div>
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
                <TagButton key={tag} onClick={() => toggleTag(tag)}>
                  {tag}
                </TagButton>
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
