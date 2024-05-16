---
title: "Setting up Gatsby"
date: "2024-05-15"
description: "Setting up Gatsby to make my blog more dynamic and interactive."
tags: ["Blog", "Gatsby"]
---

# Setting up Gatsby

My previous setup was using [marked.js](https://marked.js.org/) to render markdown files. However, I wanted to switch to Gatsby to take advantage of its features. I wanted to make the site more dynamic and interactive.

My current site is too simple and static. I want to add more features like a search bar, tags, and categories.

# Process
1. Setup Gatsby   
    `npm install -g gatsby-cli`
    `gatsby new blog https://github.com/sunghj1118/sunghj1118.github.io`
    cd blog
    gatsby develop
    `npm install -g gatsby-cli`
    `npm install -g gatsby-cli`
2. Resolve npm compatibility issues
    I ran into several compatibility issues with npm where gatsby-transformer-remark, the plugin I was using to render markdown files, was not compatible with the current version of npm. I attempted to resolve this issue by updating the plugin and npm to the latest versions.