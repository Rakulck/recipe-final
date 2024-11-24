import React, { useEffect, useState } from "react"
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css';
import { safeLocalStorage, LoadingMessage, ErrorMessage, Wrapper } from './sharedUtils';
import { Card, StyledLink } from './styled/RecipeCard';

function Veggie() {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getVeggie();
    }, [])

    const getVeggie = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const check = safeLocalStorage.getItem('veggie');
            if (check) {
                setRecipes(check);
            } else {
                const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_APIKEY}&number=9&tags=vegetarian`);
                if (!api.ok) {
                    throw new Error(`HTTP error! status: ${api.status}`);
                }
                const data = await api.json();
                safeLocalStorage.setItem("veggie", data.recipes);
                setRecipes(data.recipes);
            }
        } catch (err) {
            setError(`Failed to fetch vegetarian recipes: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    }

    const RecipeCard = ({ recipe }) => (
        <Card>
            <StyledLink to={`/recipe/${recipe.id}`}>
                <img src={recipe.image} alt={recipe.title} />
                <h4>{recipe.title}</h4>
            </StyledLink>
        </Card>
    );

    if (isLoading) return <LoadingMessage>Loading vegetarian picks...</LoadingMessage>;
    if (error) return <ErrorMessage>{error}</ErrorMessage>;
    if (!recipes || recipes.length === 0) return <ErrorMessage>No recipes found.</ErrorMessage>;

    return (
        <Wrapper>
            <h3>Veggie Picks!</h3>
            <Splide options={{
                perPage: 3,
                arrows: false,
                pagination: false,
                drag: "free",
                gap: "1rem",
                breakpoints: {
                    1024: { perPage: 2 },
                    768: { perPage: 1 }
                }
            }}>
                {recipes.map((recipe) => (
                    <SplideSlide key={recipe.id}>
                        <RecipeCard recipe={recipe} />
                    </SplideSlide>
                ))}
            </Splide>
        </Wrapper>
    )
}

export default Veggie;