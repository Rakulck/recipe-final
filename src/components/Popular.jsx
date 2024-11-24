import React, { useEffect, useState } from "react"
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css';
import { safeLocalStorage, LoadingMessage, ErrorMessage, Wrapper } from './sharedUtils';
import { Card, StyledLink } from './styled/RecipeCard';

function Popular() {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getPopular();
    }, [])

    const getPopular = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const check = safeLocalStorage.getItem('popular');
            if (check) {
                setRecipes(check);
            } else {
                const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_APIKEY}&number=12`);
                if (!api.ok) {
                    throw new Error(`HTTP error! status: ${api.status}`);
                }
                const data = await api.json();
                safeLocalStorage.setItem("popular", data.recipes);
                setRecipes(data.recipes);
            }
        } catch (err) {
            setError(`Failed to fetch popular recipes: ${err.message}`);
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

    if (isLoading) return <LoadingMessage>Loading popular picks...</LoadingMessage>;
    if (error) return <ErrorMessage>{error}</ErrorMessage>;
    if (!recipes || recipes.length === 0) return <ErrorMessage>No recipes found.</ErrorMessage>;

    return (
        <Wrapper>
            <h3>Popular Picks!</h3>
            <Splide options={{
                perPage: 4,
                arrows: false,
                pagination: false,
                drag: "free",
                gap: "1rem",
                breakpoints: {
                    1024: { perPage: 3 },
                    768: { perPage: 2 },
                    480: { perPage: 1 }
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

export default Popular;