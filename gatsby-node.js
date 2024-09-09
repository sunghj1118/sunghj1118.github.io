const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'src/posts' }); // Ensure this basePath matches your directory structure
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
      allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              tags
              date(formatString: "MMMM DD, YYYY")
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


exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type ProjectsJson implements Node {
      id: ID!
      title: String!
      description: String
      url: String
      # Add other fields from your projects.json, making them optional if needed
    }
  `
  createTypes(typeDefs)
}