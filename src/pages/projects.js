import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import ProjectCard from "../components/projectCard"

const ProjectsPage = ({ data }) => {
  const projects = data.allProjectsJson.edges

  return (
    <Layout>
      <Seo title="Projects" />
      <h1>My Projects</h1>
      <div className="projects-container">
        {projects.map(({ node: project }) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allProjectsJson {
      edges {
        node {
          title
          description
          url
        }
      }
    }
  }
`

export default ProjectsPage