import React, { useEffect, useState } from "react"
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css';
import { safeLocalStorage, LoadingMessage, ErrorMessage, Wrapper } from './sharedUtils';
import { Card, StyledLink } from './styled/RecipeCard';
import styled from 'styled-components';
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
const StyledSplide = styled(Splide)`
  .splide__track {
    border-radius: 1rem;
    overflow: hidden;
  }
`;

// Add spinner styled component (add this near other styled components)
const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 20px auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

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
                const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_APIKEY}&number=50`);
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
                <div className="img-container">
                    <img src={recipe.image} alt={recipe.title} />
                </div>
                <h4>{recipe.title}</h4>
            </StyledLink>
        </Card>
    );

    if (isLoading) return <Spinner />;
    if (error) return <ErrorMessage>{error}</ErrorMessage>;
    if (!recipes || recipes.length === 0) return <ErrorMessage>No recipes found.</ErrorMessage>;

    return (
        <Wrapper>
            <h3>Popular Picks!</h3>
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

export default Popular;