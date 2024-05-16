import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';

export default function Home({ data }) {
  return (
    <Layout>
      <h1>My Blog</h1>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <div key={node.id}>
          <h2>
            <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
          </h2>
          <p>{node.frontmatter.description}</p>
        </div>
      ))}
    </Layout>
  );
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          frontmatter {
            title
            description
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
