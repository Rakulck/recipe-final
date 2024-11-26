import React, { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import BackButton from '../components/BackButton';
import { Grid, Card, StyledLink } from '../components/styled/RecipeCard';
import { Spinner } from '../components/styled/Spinner';

function Searched() {
    const [searchedRecipes, setSearchedRecipes] = useState([]);
    const [alternativeRecipes, setAlternativeRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortType, setSortType] = useState('default');
    const params = useParams();
    const location = useLocation();

    const sortRecipes = (recipes, sortType) => {
        const sortedRecipes = [...recipes];
        
        switch(sortType) {
            case 'calories-low':
                return sortedRecipes.sort((a, b) => {
                    const caloriesA = a.nutrition?.nutrients?.find(n => n.name === "Calories")?.amount || 0;
                    const caloriesB = b.nutrition?.nutrients?.find(n => n.name === "Calories")?.amount || 0;
                    return caloriesA - caloriesB;
                });
            case 'calories-high':
                return sortedRecipes.sort((a, b) => {
                    const caloriesA = a.nutrition?.nutrients?.find(n => n.name === "Calories")?.amount || 0;
                    const caloriesB = b.nutrition?.nutrients?.find(n => n.name === "Calories")?.amount || 0;
                    return caloriesB - caloriesA;
                });
            default:
                return sortedRecipes;
        }
    };

    const getSearched = async (name) => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await fetch(
                `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_APIKEY}&query=${name}&addRecipeNutrition=true`
            );
            
            if (!data.ok) {
                throw new Error('Failed to fetch recipes');
            }
            
            const recipes = await data.json();
            console.log('API Response:', recipes.results[0]);
            setSearchedRecipes(recipes.results);
            
            if (recipes.results.length === 0) {
                const randomData = await fetch(
                    `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_APIKEY}&number=6&addRecipeNutrition=true`
                );
                if (!randomData.ok) {
                    throw new Error('Failed to fetch alternative recipes');
                }
                const randomRecipes = await randomData.json();
                setAlternativeRecipes(randomRecipes.recipes);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getSearched(params.search);
    }, [params.search]);

    const handleImageError = (e) => {
        e.target.onerror = null; // Prevents looping
        e.target.style.display = 'none';
        e.target.nextSibling.style.display = 'flex';
    }

    if (isLoading) return <Spinner />;
    if (error) return <ErrorMessage>Error: {error}</ErrorMessage>;

    return (
        <Wrapper>
            <BackButton />
            {searchedRecipes.length === 0 ? (
                <>
                    <Title>No results found for "{params.search}"</Title>
                    <SubTitle>Try these recipes instead:</SubTitle>
                    <Grid>
                        {alternativeRecipes.map((recipe) => (
                            <StyledLink to={'/recipe/' + recipe.id} key={recipe.id}>
                                <Card>
                                    <img 
                                        src={recipe.image} 
                                        alt={recipe.title} 
                                        onError={handleImageError}
                                    />
                                    <ImagePlaceholder style={{display: 'none'}}>
                                        <p>Image not available</p>
                                    </ImagePlaceholder>
                                    <h4>{recipe.title}</h4>
                                </Card>
                            </StyledLink>
                        ))}
                    </Grid>
                </>
            ) : (
                <>
                    <Title>Search Results for "{params.search}"</Title>
                    <SortContainer>
                        <StyledSelect 
                            value={sortType} 
                            onChange={(e) => setSortType(e.target.value)}
                        >
                            <option value="default">Sort by...</option>
                            <option value="calories-low">Calories: Low to High</option>
                            <option value="calories-high">Calories: High to Low</option>
                        </StyledSelect>
                    </SortContainer>
                    <Grid>
                        {sortRecipes(searchedRecipes, sortType).map((item) => (
                            <StyledLink to={'/recipe/' + item.id} key={item.id}>
                                <Card>
                                    <img 
                                        src={item.image} 
                                        alt={item.title} 
                                        onError={handleImageError}
                                    />
                                    <ImagePlaceholder style={{display: 'none'}}>
                                        <p>Image not available</p>
                                    </ImagePlaceholder>
                                    <h4>{item.title}</h4>
                                </Card>
                            </StyledLink>
                        ))}
                    </Grid>
                </>
            )}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    padding-top: 2rem;
`

const Title = styled.h2`
    text-align: center;
    margin-bottom: 2rem;
    color: #333;
    font-size: 2rem;
`

const SubTitle = styled.h3`
    text-align: center;
    margin-bottom: 2rem;
    color: #666;
    font-size: 1.5rem;
`

const ImagePlaceholder = styled.div`
    background-color: #f0f0f0;
    border-radius: 2rem;
    width: 100%;
    height: 200px;
    justify-content: center;
    align-items: center;
    p {
        color: #666;
        font-style: italic;
    }
`

const LoadingMessage = styled.div`
    text-align: center;
    font-size: 1.5rem;
    margin-top: 2rem;
    color: #333;
`

const ErrorMessage = styled.div`
    text-align: center;
    font-size: 1.5rem;
    margin-top: 2rem;
    color: #ff0000;
`

const SortContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 0 2rem 1rem 0;
`

const StyledSelect = styled.select`
    padding: 1rem 1.5rem;
    border-radius: 1rem;
    border: none;
    outline: none;
    font-size: 1.1rem;
    color: #313131;
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
    cursor: pointer;

    &:hover {
        background: linear-gradient(35deg, #313131, #494949);
    }

    option {
        background: #313131;
        color: white;
    }
`

export default Searched