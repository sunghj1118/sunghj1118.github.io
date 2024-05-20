import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

const TagTemplate = ({ data, pageContext }) => {
  const { tag } = pageContext;
  const { edges } = data.allMarkdownRemark;

  return (
    <Layout>
      <h1>Posts tagged with "{tag}"</h1>
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
  query pageUsershyunjoonProjectsPersonalsunghj1118GithubIosrctemplatestagJs4252078096($tag: String!) {
  allMarkdownRemark(
    filter: {frontmatter: {tags: {in: [$tag]}}}
    sort: {frontmatter: {date: DESC}}
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

export default TagTemplate;
