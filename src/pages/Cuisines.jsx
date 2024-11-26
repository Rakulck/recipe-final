import React, { useState, useEffect } from 'react'
import styled from "styled-components"
import { motion } from 'framer-motion'
import { Link, useParams, useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import { FaPizzaSlice, FaHamburger, FaSpinner } from 'react-icons/fa'
import { GiNoodles, GiChopsticks, GiTacos, GiIndianPalace, GiFrenchFries } from 'react-icons/gi'

const cuisineList = [
    { name: "Italian", icon: <FaPizzaSlice />, path: "italian" },
    { name: "American", icon: <FaHamburger />, path: "american" },
    { name: "Thai", icon: <GiNoodles />, path: "thai" },
    { name: "Chinese", icon: <GiChopsticks />, path: "chinese" },
    { name: "Mexican", icon: <GiTacos />, path: "mexican" },
    { name: "Indian", icon: <GiIndianPalace />, path: "indian" },
    { name: "French", icon: <GiFrenchFries />, path: "french" },
]

function Cuisines() {
    const [cuisine, setCuisine] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    let params = useParams()
    const navigate = useNavigate()

    const getCuisine = async (name) => {
        setIsLoading(true)
        setError(null)
        try {
            const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_APIKEY}&cuisine=${name}`)
            if (!data.ok) {
                throw new Error('Failed to fetch recipes')
            }
            const recipes = await data.json()
            setCuisine(recipes.results)
        } catch (err) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getCuisine(params.type)
    }, [params.type])

    const handleImageError = (e) => {
        e.target.onerror = null // Prevents looping
        e.target.style.display = 'none'
        e.target.nextSibling.style.display = 'flex'
    }

    const handleBackClick = () => {
        if (window.confirm('Do you want to go back to All Cuisines?')) {
            navigate('/')
        }
    }

    if (isLoading) return <LoadingMessage><FaSpinner className="spinner" />Loading...</LoadingMessage>
    if (error) return <ErrorMessage>Error: {error}</ErrorMessage>
    if (cuisine.length === 0) return <NoResultsMessage>No recipes found for "{params.type}" cuisine. Try a different cuisine.</NoResultsMessage>

    return (
        <Container>
            <BackButton onClick={handleBackClick} />
            <CuisineList>
                {cuisineList.map((cuisine) => (
                    <SLink 
                        to={'/cuisine/' + cuisine.path} 
                        key={cuisine.name}
                        className={params.type === cuisine.path ? 'active' : ''}
                    >
                        <div>{cuisine.icon}</div>
                        <h4>{cuisine.name}</h4>
                    </SLink>
                ))}
            </CuisineList>
            <Grid
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >   
                {cuisine.map((item) => {
                    return (
                        <Card key={item.id}>
                            <Link to={'/recipe/' + item.id}>
                                <ImageContainer>
                                    <img 
                                        src={item.image} 
                                        alt={item.title}
                                        onError={handleImageError}
                                    />
                                    <ImagePlaceholder style={{display: 'none'}}>
                                        <p>Image not available</p>
                                    </ImagePlaceholder>
                                </ImageContainer>
                                <h4>{item.title}</h4>     
                            </Link>           
                        </Card>
                    )
                })}
            </Grid>
        </Container>
    )
}

const Container = styled.div`
    padding: 2rem;
    position: relative;
`

const Grid = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(19rem, 1fr));
    grid-gap: 2rem;
    margin-top: 2rem;
`

const Card = styled.div`
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 2rem;
    }
    a {
        text-decoration: none;
    }
    h4 {
        text-align: center;
        padding: 1rem;
        color: #333;
    }
    &:hover {
        transform: scale(1.02);
        transition: transform 0.3s ease-in-out;
    }
`

const ImageContainer = styled.div`
    width: 100%;
    height: 250px;
    border-radius: 2rem;
    overflow: hidden;
    position: relative;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`

const ImagePlaceholder = styled.div`
    background-color: #f0f0f0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
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
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    .spinner {
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`

const ErrorMessage = styled.div`
    text-align: center;
    font-size: 1.5rem;
    margin-top: 2rem;
    color: #ff0000;
`

const NoResultsMessage = styled.div`
    text-align: center;
    font-size: 1.5rem;
    margin-top: 2rem;
    color: #333;
`

const CuisineList = styled.div`
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin: 2rem 0;
    flex-wrap: wrap;
`

const SLink = styled(Link)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    text-decoration: none;
    background: linear-gradient(35deg, #494949, #313131);
    width: 6rem;
    height: 6rem;
    cursor: pointer;
    transition: background 0.3s ease;

    h4 {
        color: white;
        font-size: 0.8rem;
        margin-top: 0.5rem;
    }

    svg {
        color: white;
        font-size: 2rem;
    }

    &.active {
        background: linear-gradient(to right, #f27121, #e94057);
        box-shadow: 0 0 15px rgba(242, 113, 33, 0.4);
    }
`

export default Cuisines