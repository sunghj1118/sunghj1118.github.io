// src/components/post-link.js

import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const PostWrapper = styled.div`
  border-bottom: 1px solid #ddd;
  padding-bottom: 15px;
  margin-bottom: 15px;
`;

const PostTitle = styled.h2`
  margin-bottom: 8px;
  font-size: 16px; /* Adjusted size */
  font-weight: 700;
`;

const PostDate = styled.p`
  color: #888;
  margin-bottom: 8px;
  font-size: 12px; /* Adjusted size */
`;

const PostExcerpt = styled.p`
  margin-bottom: 8px;
  font-size: 12px; /* Adjusted size */
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.span`
  background-color: #e0e0e0;
  border-radius: 20px;
  padding: 5px 10px;
  font-size: 12px; /* Adjusted size */
  color: #333;
`;

const PostLink = ({ post }) => (
  <PostWrapper>
    <Link to={post.fields.slug}>
      <PostTitle>{post.frontmatter.title}</PostTitle>
    </Link>
    <PostDate>{post.frontmatter.date}</PostDate>
    <PostExcerpt>{post.excerpt}</PostExcerpt>
    <TagList>
      {post.frontmatter.tags.map(tag => (
        <Tag key={tag}>{tag}</Tag>
      ))}
    </TagList>
  </PostWrapper>
);

export default PostLink;
