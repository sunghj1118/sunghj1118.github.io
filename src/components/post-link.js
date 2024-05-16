// src/components/post-link.js

import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const PostWrapper = styled.div`
  border-bottom: 1px solid #ddd; // Separator line
  padding-bottom: 20px;
  margin-bottom: 20px;
`;

const PostTitle = styled.h2`
  margin-bottom: 10px;
  font-size: 24px;
  font-weight: 700;
`;

const PostDate = styled.p`
  color: #888;
  margin-bottom: 10px;
`;

const PostExcerpt = styled.p`
  margin-bottom: 10px;
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Tag = styled.span`
  background-color: #e0e0e0;
  border-radius: 20px;
  padding: 5px 10px;
  font-size: 14px;
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
