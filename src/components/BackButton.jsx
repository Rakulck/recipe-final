import { useNavigate } from 'react-router-dom';

function BackButton({ onClick }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1); // Go back one step in history if no onClick provided
    }
  };

  return (
    <button 
      onClick={handleClick}
      className="back-button"
      style={{ 
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        margin: '2rem 0rem'
      }}
    >
      &lt; Back
    </button>
  );
}

export default BackButton; 