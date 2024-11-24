import { FaPizzaSlice, FaHamburger } from 'react-icons/fa';
import { GiNoodles, GiButterToast, GiChopsticks, GiRiceCooker, GiBowlOfRice, GiTeapot, GiNoodles as GiVietNoodles } from 'react-icons/gi';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

function All_Cuisines() {
  return (
    <List>
      <Grid>
        <SLink to={'/cuisine/Italian'}>
          <FaPizzaSlice/>
          <h4>Italian</h4>
        </SLink>
        <SLink to={'/cuisine/American'}>
          <FaHamburger/>
          <h4>American</h4>
        </SLink>
        <SLink to={'/cuisine/Thai'}>
          <GiNoodles/>
          <h4>Thai</h4>
        </SLink>
        <SLink to={'/cuisine/French'}>
          <GiButterToast/>
          <h4>French</h4>
        </SLink>
        <SLink to={'/cuisine/Japanese'}>
          <GiChopsticks/>
          <h4>Japanese</h4>
        </SLink>
        <SLink to={'/cuisine/Indian'}>
          <GiRiceCooker/>
          <h4>Indian</h4>
        </SLink>
        <SLink to={'/cuisine/Korean'}>
          <GiBowlOfRice/>
          <h4>Korean</h4>
        </SLink>
        <SLink to={'/cuisine/British'}>
          <GiTeapot/>
          <h4>British</h4>
        </SLink>
        <SLink to={'/cuisine/Vietnamese'}>
          <GiVietNoodles/>
          <h4>Vietnamese</h4>
        </SLink>
      </Grid>
    </List>
  );
}

const List = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0rem;
  padding: 0 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 1rem;
  }
`;

const SLink = styled(NavLink)`
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
  transform: scale(0.8);
  margin: 0 auto;
  
  h4 {
    color: white;
    font-size: 0.8rem;
  }
  
  svg {
    color: white;
    font-size: 2.5rem;
  }
  
  &.active {
    background: linear-gradient(to right, #f27121, #e94057);
    
    svg {
      color: white;
    }
    
    h4 {
      color: white;
    }
  }

  &:hover {
    transform: scale(0.9);
    transition: transform 0.3s ease-in-out;
  }
`;

export default All_Cuisines;