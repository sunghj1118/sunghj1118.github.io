const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'posts/blog' });
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              tags
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.');
    return;
  }

  const posts = result.data.allMarkdownRemark.edges;
  const tags = new Set();

  // Create individual blog post pages
  posts.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve('./src/templates/blog-post.js'),
      context: {
        slug: node.fields.slug,
      },
    });

    if (node.frontmatter.tags) {
      node.frontmatter.tags.forEach(tag => tags.add(tag));
    }
  });

  // Create tag pages
  tags.forEach(tag => {
    createPage({
      path: `/tag/${tag.toLowerCase()}/`,
      component: path.resolve('./src/templates/tag.js'),
      context: {
        tag,
      },
    });
  });
};
