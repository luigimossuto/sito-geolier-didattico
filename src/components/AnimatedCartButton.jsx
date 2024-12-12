import { useState } from 'react';
import styled from 'styled-components';

const AnimatedCartButton = ({ index, AggiungiAlCarrelloIcon, onClick }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (e) => {
    e.preventDefault(); // Previene la navigazione immediata
    e.stopPropagation(); // Previene la propagazione dell'evento
    setIsClicked(true);
    onClick(e);
    setTimeout(() => {
      setIsClicked(false);
    }, 1200); // Ritardo prima di resettare il bottone
  };

  return (
    <StyledButton 
      className={`absolute bottom-3 right-3 min-w-max h-auto !rounded-full bg-colorefooter-default flex items-center justify-center`}
      $isClicked={isClicked}
      onClick={handleClick}
    >
      <div className="icon">
        <AggiungiAlCarrelloIcon className="sm:w-6 min-[440px]:w-6 w-5 text-secondario-default fill-current" />
      </div>
      <div className="text">+1</div>
    </StyledButton>
  );
};

const StyledButton = styled.button`
@media (min-width: 440px) {
  width: 45px;
  height: 45px;
}
  width: 40px;
  height: 40px;
  border: none;
  cursor: pointer;
  position: absolute;
  overflow: hidden;
  transition: all 0.5s ease-in-out;

  &:hover {
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
  }

  .icon, .text {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease-in-out;
  }

  .text {
    background-color: #008080;
    color: white;
    font-size: 1.2rem;
    font-weight: 600;
    transform: ${props => props.$isClicked ? 'translateY(0)' : 'translateY(50px)'};
  }

  .icon {
    background-color: ${props => props.$isClicked ? 'transparent' : 'inherit'};
    transform: ${props => props.$isClicked ? 'translateY(-50px) scale(0) rotate(120deg)' : 'translateY(0) scale(1)'};
  }
`;

export default AnimatedCartButton;