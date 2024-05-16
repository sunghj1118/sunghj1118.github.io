import React from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import Layout from '../components/layout';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
`;

const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
`;

const TagItem = styled.li`
  margin: 0.5rem;
`;

const TagLink = styled(Link)`
  background: #f5f5f5;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  text-decoration: none;
  color: #333;
  transition: background 0.3s ease;

  &:hover {
    background: #ddd;
  }
`;

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
      <Container>
        <Title>Tags</Title>
        <TagList>
          {tags.map(tag => (
            <TagItem key={tag.fieldValue}>
              <TagLink to={`/tag/${tag.fieldValue.toLowerCase()}/`}>
                {tag.fieldValue} ({tag.totalCount})
              </TagLink>
            </TagItem>
          ))}
        </TagList>
      </Container>
    </Layout>
  );
};

export default IndexPage;
