import React from "react"
import { Link } from "gatsby"

const ProjectCard = ({ project }) => (
  <div className="project-card">
    <h2>{project.title}</h2>
    {project.description && <p>{project.description}</p>}
    {project.url && (
      <Link to={project.url}>
        {project.title}
      </Link>
    )}
  </div>
)

export default ProjectCard