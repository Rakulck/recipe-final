import React, { useEffect, useState } from "react"
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css';
import { safeLocalStorage, LoadingMessage, ErrorMessage, Wrapper } from './sharedUtils';
import { Card, StyledLink } from './styled/RecipeCard';
import styled from 'styled-components';
import { Spinner } from './styled/Spinner';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';

// Add new styled components for arrows
const Arrow = styled.div`
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  z-index: 2;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 1);
  }

  &.prev {
    left: 10px;
  }

  &.next {
    right: 10px;
  }
`;

// Add this styled component after other styled components
const StyledSplide = styled(Splide)`
  .splide__track {
    border-radius: 1rem;
    overflow: hidden;
  }
`;

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
                const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_APIKEY}&number=50&tags=vegetarian`);
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

    if (isLoading) return <Spinner />;
    if (error) return <ErrorMessage>{error}</ErrorMessage>;
    if (!recipes || recipes.length === 0) return <ErrorMessage>No recipes found.</ErrorMessage>;

    return (
        <Wrapper>
            <h3>Veggie Picks</h3>
            <StyledSplide  // Replace Splide with StyledSplide
                options={{
                    perPage: 3,
                    arrows: true,
                    pagination: false,
                    drag: "free",
                    gap: "1rem",
                    type: 'loop',
                    autoScroll: {
                        speed: 1,
                        pauseOnHover: true,
                        rewind: false,    // Prevent rewind animation
                        gap: 0,           // Remove gap during transition
                    },
                    focus: 'center',      // Helps with smoother looping
                    breakpoints: {
                        1024: { perPage: 2 },
                        768: { perPage: 1 }
                    }
                }}
                extensions={{ AutoScroll }}
                renderControls={() => (
                    <>
                        <Arrow className="prev splide__arrow--prev">←</Arrow>
                        <Arrow className="next splide__arrow--next">→</Arrow>
                    </>
                )}>
                {recipes.map((recipe) => (
                    <SplideSlide key={recipe.id}>
                        <RecipeCard recipe={recipe} />
                    </SplideSlide>
                ))}
            </StyledSplide>
        </Wrapper>
    )
}

export default Veggie;