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
        <StyledNavLink to={"/All_Cuisines"}>Cuisines</StyledNavLink>
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
  font-family: 'Lobster Two', cursive;
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
    flex-direction: column;
    gap: 1rem;
  }
`;
const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    gap: 1rem;
    width: 100%;
    justify-content: space-around;
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
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
  font-family: "Fira Spring", sans-serif;

  svg {
    font-size: 1.5rem;
  }

  &:focus,
  &:focus-visible {
    outline: none;
  }

  &:hover {
    color: #f27121;
    transform: scale(1.05);
  }

  &.active {
    color: #f27121;
    transform: scale(1.05);
    font-weight: 600;
    border: 2px solid white;
    border-radius: 4px;
    padding: 0.2rem 0.5rem;
    outline: none;
  }

  @media (max-width: 768px) {
    font-size: 1.4rem;
    padding: 0.1rem 0.3rem;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
    
    &.active {
      padding: 0.1rem 0.3rem;
    }
  }
`;