"use strict";(self.webpackChunkmy_blog=self.webpackChunkmy_blog||[]).push([[502],{1221:function(e,t,n){n.d(t,{A:function(){return u}});var a=n(6540),l=n(4794),r=n(2568);const o=r.default.header.withConfig({displayName:"header__HeaderContainer",componentId:"sc-10kxh5x-0"})(["background:#333;padding:1rem 0;"]),c=r.default.nav.withConfig({displayName:"header__Nav",componentId:"sc-10kxh5x-1"})(["display:flex;justify-content:space-between;max-width:1200px;margin:0 auto;"]),d=(0,r.default)(l.Link).withConfig({displayName:"header__NavLink",componentId:"sc-10kxh5x-2"})(["color:white;text-decoration:none;margin:0 1rem;transition:color 0.3s ease;&:hover{color:#ddd;}"]);var i=()=>a.createElement(o,null,a.createElement(c,null,a.createElement(d,{to:"/"},"Home"),a.createElement(d,{to:"/about"},"About"),a.createElement(d,{to:"/blog"},"Blog")));const m=r.default.main.withConfig({displayName:"layout__Main",componentId:"sc-l9pqj7-0"})(["padding:2rem;"]);var u=e=>{let{children:t}=e;return a.createElement(a.Fragment,null,a.createElement(i,null),a.createElement(m,null,t))}},1804:function(e,t,n){n.r(t);var a=n(6540),l=n(1221);t.default=e=>{let{data:t,pageContext:n}=e;const{tag:r}=n,{edges:o}=t.allMarkdownRemark;return a.createElement(l.A,null,a.createElement("h1",null,'Posts tagged with "',r,'"'),a.createElement("ul",null,o.map((e=>{let{node:t}=e;return a.createElement("li",{key:t.id},a.createElement("a",{href:t.fields.slug},t.frontmatter.title))}))))}}}]);
//# sourceMappingURL=component---src-templates-tag-js-cd9090432e4eb06c3279.js.map