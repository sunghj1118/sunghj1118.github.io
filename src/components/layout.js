import React from 'react';
import { Link } from 'gatsby';
import './layout.css';

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <Link to="/">Home</Link>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
