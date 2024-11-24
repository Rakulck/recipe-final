import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import BackButton from "../components/BackButton";
function Popular() {
  const [popular, setPopular] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async () => {
    try {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_APIKEY}&number=12`
      );
      
      if (!api.ok) {
        throw new Error(`API responded with status: ${api.status}`);
      }
      
      const data = await api.json();
      console.log("API Response:", data);
      setPopular(data.results);
      setIsLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Loading popular recipes...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!popular || popular.length === 0) return <div>No recipes found</div>;

  return (
    <div>
      <BackButton/>
      <Grid
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {popular.map((recipe) => (
          <Card key={recipe.id}>
            <Link to={"/recipe/" + recipe.id}>
              <img src={recipe.image} alt={recipe.title} />
              <h4>{recipe.title}</h4>
            </Link>
          </Card>
        ))}
      </Grid>
    </div>
  );
}

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
  padding: 2rem;
`;

const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
    color: black;
  }
`;

export default Popular;
