import { BrowserRouter } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { GiKnifeFork } from "react-icons/gi";
import { ErrorBoundary } from "react-error-boundary";
import Pages from "./pages/Pages";
import Search from "./components/Search";
import Navbar from "./components/Navbar";
import { useState, useEffect, Suspense } from "react";

// Add styled container for consistent layout and feedback
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }

  // Add focus styles for better keyboard navigation
  *:focus {
    outline: 2px solid #3498db;
    outline-offset: 2px;
  }

  // Add smooth scrolling
  scroll-behavior: smooth;
`;

// Add styled components for error messages
const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  margin: 2rem auto;
  max-width: 600px;
  background: #fff3f3;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h2 {
    color: #e74c3c;
    margin-bottom: 1rem;
  }

  p {
    color: #666;
  }
`;

// Add loading spinner component
const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;

  &:after {
    content: "";
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

// Add skip to main content link for accessibility
const SkipLink = styled.a`
  position: absolute;
  left: -9999px;
  top: 0;
  padding: 1rem;
  background: #3498db;
  color: white;
  z-index: 9999;

  &:focus {
    left: 0;
  }
`;

// Error fallback component
const ErrorFallback = ({ error }) => (
  <div role="alert">
    <h2>Something went wrong:</h2>
    <pre>{error.message}</pre>
  </div>
);

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOnline) {
    return (
      <BrowserRouter>
        <Container>
          <Navbar aria-label="Main navigation" />
          <Search aria-label="Search recipes" />
          <ErrorMessage
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <h2>No Internet Connection</h2>
            <p>Please check your internet connection to view recipes.</p>
          </ErrorMessage>
        </Container>
      </BrowserRouter>
    );
  }

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.reload()}
    >
      <BrowserRouter>
        <SkipLink href="#main-content">Skip to main content</SkipLink>
        <Container id="main-content">
          <Navbar aria-label="Main navigation" />
          <Search aria-label="Search recipes" />
          <Pages />
        </Container>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
