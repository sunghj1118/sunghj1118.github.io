import React from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import Layout from '../components/layout';

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        group(field: frontmatter___tags) {
          fieldValue
          totalCount
        }
      }
    }
  `);

  const tags = data.allMarkdownRemark.group;

  return (
    <Layout>
      <h1>Tags</h1>
      <ul>
        {tags.map(tag => (
          <li key={tag.fieldValue}>
            <Link to={`/tag/${tag.fieldValue.toLowerCase()}/`}>
              {tag.fieldValue} ({tag.totalCount})
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default IndexPage;
