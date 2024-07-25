import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  background: #333;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  margin: 0 1rem;
  font-size: 1.2rem;

  &:hover {
    color: #ddd;
  }
`;

function Navbar() {
  return (
    <Nav>
      <NavLink to="/">Home</NavLink>
      <div>
        <NavLink to="/post-write">Write Post</NavLink>
      </div>
    </Nav>
  );
}

export default Navbar;
