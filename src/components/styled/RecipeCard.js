import styled from "styled-components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
  padding: 2rem;
`;

export const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
    transition: transform 0.3s ease-in-out;
  }

  h4 {
    text-align: center;
    padding: 1rem;
    color: #313131;
    font-weight: 600;
    transition: color 0.3s ease;
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  width: 100%;
  height: 100%;
  display: block;

  &:hover {
    h4 {
      color: #f27121;
    }
    img {
      transform: scale(1.02);
      transition: transform 0.3s ease-in-out;
    }
  }
`;
