import React, { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import { Grid, Card, StyledLink } from "../components/styled/RecipeCard";
import { Spinner } from "../components/styled/Spinner";

function Veggie() {
  const [veggie, setVeggie] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getVeggie();
  }, []);

  const getVeggie = async () => {
    try {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_APIKEY}&number=12&diet=vegetarian`
      );
      
      if (!api.ok) {
        throw new Error(`API responded with status: ${api.status}`);
      }
      
      const data = await api.json();
      setVeggie(data.results);
      setIsLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  if (isLoading) return <Spinner />;
  if (error) return <div>Error: {error}</div>;
  if (!veggie || veggie.length === 0) return <div>No recipes found</div>;

  return (
    <div>
      <BackButton />
      <Grid
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {veggie.map((recipe) => (
          <Card key={recipe.id}>
            <StyledLink to={`/recipe/${recipe.id}`}>
              <img src={recipe.image} alt={recipe.title} />
              <h4>{recipe.title}</h4>
            </StyledLink>
          </Card>
        ))}
      </Grid>
    </div>
  );
}

export default Veggie;
