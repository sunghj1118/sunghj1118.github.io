import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import styled from "styled-components"

const PostTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
`

const PostDate = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 2rem;
`

const BlogPostTemplate = ({ data }) => {
  const post = data.markdownRemark
  const { frontmatter, html } = post

  return (
    <Layout>
      <PostTitle>{frontmatter.title}</PostTitle>
      <PostDate>{frontmatter.date}</PostDate>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
      html
    }
  }
`

export default BlogPostTemplate
