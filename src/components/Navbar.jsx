import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { GiKnifeFork } from 'react-icons/gi';
import './Navbar.css';
import styled from "styled-components";
function Navbar() {
  return (
    <Nav>
      <LogoContainer>
        <GiKnifeFork />
        <Logo to={"/"}>Delicioussssss</Logo>
      </LogoContainer>
      <NavLinks>
        <StyledNavLink to={"/All_Cuisines"}>
          <span>Cuisines</span>
        </StyledNavLink>
        <StyledNavLink to={"/popular"}>Popular</StyledNavLink>
        <StyledNavLink to={"/Veggie"}>Veggie</StyledNavLink>
      </NavLinks>
    </Nav>
  );
}

export default Navbar; 
const Logo = styled(Link)`
  text-decoration: none;
  font-size: 2.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    font-size: 2.5rem;
    
    @media (max-width: 768px) {
      font-size: 1.8rem;
    }
  }
`;
const Nav = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  padding: 1.5rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
  margin: 0;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;
const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;
const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #313131;
  font-size: 1.8rem;
  font-weight: 500;
  transition: all 0.3s ease;

  span {
    font-family: "Fira Spring", sans-serif;
  }

  svg {
    font-size: 1.5rem;
  }

  &:hover {
    color: #f27121;
    transform: scale(1.05);
  }

  &.active {
    color: #f27121;
    transform: scale(1.05);
    font-weight: 600;
    border-bottom: 2px solid #f27121;
  }

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;