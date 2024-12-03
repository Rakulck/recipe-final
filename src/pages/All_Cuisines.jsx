import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

function All_Cuisines() {
  return (
    <List>
      <Grid>
        <SLink to={'/cuisine/Italian'}>
          <Card>
         
            <ImageWrapper>
              <img src="/italian.jpg" alt="Italian cuisine" />
            </ImageWrapper>
            <h4>Italian</h4>
          </Card>
        </SLink>
        <SLink to={'/cuisine/American'}>
          <Card>
  
            <ImageWrapper>
              <img src="/american.jpg" alt="American cuisine" />
            </ImageWrapper>
            <h4>American</h4>
          </Card>
        </SLink>
        <SLink to={'/cuisine/Thai'}>
          <Card>
        
            <ImageWrapper>
              <img src="/thai.jpg" alt="Thai cuisine" />
            </ImageWrapper>
            <h4>Thai</h4>
          </Card>
        </SLink>
        <SLink to={'/cuisine/French'}>
          <Card>
 
            <ImageWrapper>
              <img src="/french.jpg" alt="French cuisine" />
            </ImageWrapper>
            <h4>French</h4>
          </Card>
        </SLink>
        <SLink to={'/cuisine/Japanese'}>
          <Card>

            <ImageWrapper>
              <img src="/japan.jpg" alt="Japanese cuisine" />
            </ImageWrapper>
            <h4>Japanese</h4>
          </Card>
        </SLink>
        <SLink to={'/cuisine/Indian'}>
          <Card>
         
            <ImageWrapper>
              <img src="/indian.jpg" alt="Indian cuisine" />
            </ImageWrapper>
            <h4>Indian</h4>
          </Card>
        </SLink>
        <SLink to={'/cuisine/Korean'}>
          <Card>
          
            <ImageWrapper>
              <img src="/korean.jpg" alt="Korean cuisine" />
            </ImageWrapper>
            <h4>Korean</h4>
          </Card>
        </SLink>
        <SLink to={'/cuisine/British'}>
          <Card>
    
            <ImageWrapper>
              <img src="/british.jpg" alt="British cuisine" />
            </ImageWrapper>
            <h4>British</h4>
          </Card>
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
  gap: 3rem;
  max-width: 1400px;
  width: 100%;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 1.5rem;
  }
`;

const SLink = styled(NavLink)`
  text-decoration: none;
  cursor: pointer;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0,0,0,0.08);
  transition: all 0.3s ease-in-out;
  background: white;
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0,0,0,0.12);
    
    h4 {
      color: #ff6b00;
    }
  }

  h4 {
    margin: 0;
    padding: 1rem;
    font-size: 1.25rem;
    font-weight: 600;
    color: #333;
    text-align: center;
    transition: color 0.3s ease;
  }
`;

const Flag = styled.span`
  font-size: 3rem;
  margin-bottom: 0.75rem;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
`;

const ImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.1);
  }
`;

export default All_Cuisines;