import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";

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
        fontSize: '1.5rem',
        fontWeight: 'bold',
        margin: '2rem 0rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}
    >
      <IoArrowBack  size={36}/>
    </button>
  );
}

export default BackButton; 