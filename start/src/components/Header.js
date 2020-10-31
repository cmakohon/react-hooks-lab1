import styled from "styled-components";
import { AiOutlineHome } from "react-icons/ai";

function Header(props) {
  return (
    <Row>
      <AiOutlineHome
        style={{
          color: '#FF5D73',
          marginRight: "1rem",
          fontSize: "36pt"
        }}
      />
      <HomeName>{props.title}</HomeName>
    </Row>
  );
}

export default Header;

const HomeName = styled.span`
  color: #c1cfda;
  font-size: 36pt;
  font-weight: 100;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
`;
