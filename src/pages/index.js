import React from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import Layout from '../components/layout';

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        group(field: frontmatter___category) {
          fieldValue
          totalCount
        }
      }
    }
  `);

  const categories = data.allMarkdownRemark.group;

  return (
    <Layout>
      <h1>Categories</h1>
      <ul>
        {categories.map(category => (
          <li key={category.fieldValue}>
            <Link to={`/category/${category.fieldValue.toLowerCase()}/`}>
              {category.fieldValue} ({category.totalCount})
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default IndexPage;
