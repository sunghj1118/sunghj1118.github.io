import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import styled from "styled-components";
import ViewCount from "../components/ViewCount";

const PostTitle = styled.h1`
  font-size: 2.5rem;
  margin: 0.5rem 0 0.5rem 0;
`;

const PostDate = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 1rem;
`;

const StyledViewCount = styled(ViewCount)`
  margin-top: 2rem;
  font-size: 0.9rem;
  color: #666;
`;

const AllPostsButton = styled(Link)`
  display: inline-block;
  margin-bottom: 0.5rem;
  padding: 0.3rem 0.6rem;
  background-color: #6a9b86;
  color: white;
  text-decoration: none;
  border-radius: 3px;
  font-size: 0.875rem;
  font-weight: normal;

  &:hover {
    background-color: #005fa3;
  }
`;

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark;
  const { frontmatter, html, fields } = post;

  return (
    <Layout>
      <AllPostsButton to="/">&lt; All posts</AllPostsButton>
      <PostTitle>{frontmatter.title}</PostTitle>
      <PostDate>{frontmatter.date}</PostDate>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <StyledViewCount path={fields.slug} />
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
      html
      fields {
        slug
      }
    }
  }
`;

export default BlogPostTemplate;
