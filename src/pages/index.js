// src/pages/index.js

import React, { useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/layout';
import PostLink from '../components/post-link';

const TagButton = styled.button`
  background-color: ${props => (props.selected ? '#007BFF' : '#E0E0E0')};
  border: none;
  border-radius: 20px;
  color: ${props => (props.selected ? '#FFFFFF' : '#333333')};
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  margin: 10px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, transform 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #007BFF;
    color: #FFFFFF;
    transform: scale(1.05);
  }
`;

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        edges {
          node {
            id
            frontmatter {
              title
              date(formatString: "MMMM DD, YYYY")
              tags
            }
            fields {
              slug
            }
            excerpt
          }
        }
      }
    }
  `);

  const [selectedTags, setSelectedTags] = useState([]);

  const allPosts = data.allMarkdownRemark.edges;

  const tagCounts = allPosts.reduce((acc, post) => {
    post.node.frontmatter.tags.forEach(tag => {
      if (acc[tag]) {
        acc[tag]++;
      } else {
        acc[tag] = 1;
      }
    });
    return acc;
  }, {});

  const allTags = Object.keys(tagCounts);

  const toggleTag = tag => {
    setSelectedTags(prevSelectedTags =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter(t => t !== tag)
        : [...prevSelectedTags, tag]
    );
  };

  const filteredPosts = allPosts.filter(post =>
    selectedTags.every(tag => post.node.frontmatter.tags.includes(tag))
  );

  return (
    <Layout>
      <h1>Tags</h1>
      <div>
        {allTags.map(tag => (
          <TagButton
            key={tag}
            onClick={() => toggleTag(tag)}
            selected={selectedTags.includes(tag)}
          >
            {tag} ({tagCounts[tag]})
          </TagButton>
        ))}
      </div>
      <h2>Posts</h2>
      <div>
        {filteredPosts.map(({ node }) => (
          <PostLink key={node.id} post={node} />
        ))}
      </div>
    </Layout>
  );
};

export default IndexPage;
