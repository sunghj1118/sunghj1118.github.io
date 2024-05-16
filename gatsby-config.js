module.exports = {
  siteMetadata: {
    title: `My Blog`,
    description: `A blog built with Gatsby`,
    author: `@hyunjoon`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts`,
      },
    },
    `gatsby-transformer-remark`
  ],
};
