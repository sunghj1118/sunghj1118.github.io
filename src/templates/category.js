import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

const CategoryTemplate = ({ data, pageContext }) => {
  const { category } = pageContext;
  const { edges } = data.allMarkdownRemark;

  return (
    <Layout>
      <h1>{category}</h1>
      <ul>
        {edges.map(({ node }) => (
          <li key={node.id}>
            <a href={node.fields.slug}>{node.frontmatter.title}</a>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export const query = graphql`
  query($category: String!) {
    allMarkdownRemark(
      filter: { frontmatter: { category: { eq: $category } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;

export default CategoryTemplate;
