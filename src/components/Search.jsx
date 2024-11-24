import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaSearch, FaHistory } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import searchSuggestions from './SearchSuggestions';

// Max number of recent searches to store
const MAX_RECENT_SEARCHES = 5;

const FormStyle = styled.form`
    max-width: 100%;
    margin: 0 auto;
    padding: 0 1rem;
    position: relative;
    margin-top: 2rem;

    @media (min-width: 768px) {
        max-width: 80%;
    }

    @media (min-width: 1024px) {
        max-width: 60%;
    }

    div {
        width: 100%;
        position: relative;
    }

    input {
        border: none;
        background: linear-gradient(35deg, #494949, #313131);
        color: white;
        border-radius: 1rem;
        padding: 0.8rem 3rem;
        outline: none;
        width: 100%;
        font-size: 0.9rem;

        @media (min-width: 768px) {
            padding: 1rem 3rem;
            font-size: 1rem;
        }

        &::placeholder {
            color: #a9a9a9;
        }
    }

    svg {
        position: absolute;
        top: 50%;
        left: 1rem;
        transform: translateY(-50%);
        color: white;
        font-size: 1.2rem;
    }
`;

const SuggestionList = styled.ul`
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 0 0 1rem 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-height: 200px;
    overflow-y: auto;
    z-index: 1;
    margin-top: 0.5rem;
`;

const SuggestionItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-size: 0.9rem;

    @media (min-width: 768px) {
        font-size: 1rem;
    }

    &:hover, &.selected {
        background-color: #f0f0f0;
    }

    .suggestion-text {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .remove-button {
        color: #999;
        font-size: 0.8rem;
        padding: 0.2rem 0.5rem;
        &:hover {
            color: #666;
        }
    }
`;

const SectionTitle = styled.div`
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
    color: #666;
    background-color: #f5f5f5;
    border-bottom: 1px solid #ddd;
`;

function Search() {
    const [input, setInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [recentSearches, setRecentSearches] = useState([]);
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
    const [hasSearched, setHasSearched] = useState(false);
    const [showRecent, setShowRecent] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const inputRef = useRef(null);

    useEffect(() => {
        const stored = localStorage.getItem('recentSearches');
        if (stored) {
            setRecentSearches(JSON.parse(stored));
        }
    }, []);

    useEffect(() => {
        setInput("");
        setHasSearched(false);
        setSuggestions([]);
        setShowRecent(false);
    }, [location]);

    const addToRecentSearches = (searchTerm) => {
        const updated = [
            searchTerm,
            ...recentSearches.filter(term => term !== searchTerm)
        ].slice(0, MAX_RECENT_SEARCHES);
        
        setRecentSearches(updated);
        localStorage.setItem('recentSearches', JSON.stringify(updated));
    };

    const removeFromRecentSearches = (searchTerm) => {
        if (window.confirm(`Are you sure you want to remove "${searchTerm}" from recent searches?`)) {
            const updated = recentSearches.filter(term => term !== searchTerm);
            setRecentSearches(updated);
            localStorage.setItem('recentSearches', JSON.stringify(updated));
        }
    };

    const getSuggestions = (value) => {
        return searchSuggestions.filter(item =>
            item.toLowerCase().includes(value.toLowerCase())
        );
    };

    useEffect(() => {
        if (input.length > 0 && !hasSearched) {
            setSuggestions(getSuggestions(input));
            setShowRecent(false);
        } else {
            setSuggestions([]);
        }
        setSelectedSuggestionIndex(-1);
    }, [input, hasSearched]);

    const performSearch = (searchTerm) => {
        addToRecentSearches(searchTerm);
        navigate('/searched/' + searchTerm);
        setHasSearched(true);
        setShowRecent(false);
        if (inputRef.current) {
            inputRef.current.blur();
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (input) {
            performSearch(input);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        performSearch(suggestion);
    };

    const handleKeyDown = (e) => {
        const totalItems = showRecent ? recentSearches.length : suggestions.length;
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedSuggestionIndex(prev => 
                prev < totalItems - 1 ? prev + 1 : prev
            );
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedSuggestionIndex(prev => (prev > 0 ? prev - 1 : -1));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (selectedSuggestionIndex >= 0) {
                const selectedItem = showRecent 
                    ? recentSearches[selectedSuggestionIndex]
                    : suggestions[selectedSuggestionIndex];
                performSearch(selectedItem);
            } else {
                submitHandler(e);
            }
        }
    };

    const handleInputChange = (e) => {
        setInput(e.target.value);
        setHasSearched(false);
        setShowRecent(false);
    };

    const handleInputFocus = () => {
        setHasSearched(false);
        setShowRecent(input.length === 0 && recentSearches.length > 0);
    };

    return (
        <FormStyle onSubmit={submitHandler}>
            <div>
                <FaSearch />
                <input
                    ref={inputRef}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={handleInputFocus}
                    type="text"
                    value={input}
                    placeholder="Search cuisines or ingredients or meal type..."
                />
            </div>
            
            {(suggestions.length > 0 || (showRecent && recentSearches.length > 0)) && !hasSearched && (
                <SuggestionList>
                    {showRecent && (
                        <>
                            <SectionTitle>Recent Searches</SectionTitle>
                            {recentSearches.map((term, index) => (
                                <SuggestionItem
                                    key={`recent-${index}`}
                                    onClick={() => handleSuggestionClick(term)}
                                    className={index === selectedSuggestionIndex ? 'selected' : ''}
                                >
                                    <div className="suggestion-text">
                                        <FaHistory size={12} />
                                        {term}
                                    </div>
                                    <button 
                                        className="remove-button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeFromRecentSearches(term);
                                        }}
                                    >
                                        Remove
                                    </button>
                                </SuggestionItem>
                            ))}
                        </>
                    )}
                    
                    {suggestions.length > 0 && (
                        <>
                            {showRecent && <SectionTitle>Suggestions</SectionTitle>}
                            {suggestions.map((suggestion, index) => (
                                <SuggestionItem
                                    key={`suggestion-${index}`}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    className={index === selectedSuggestionIndex ? 'selected' : ''}
                                >
                                    <div className="suggestion-text">
                                        {suggestion}
                                    </div>
                                </SuggestionItem>
                            ))}
                        </>
                    )}
                </SuggestionList>
            )}
        </FormStyle>
    );
}

export default Search;