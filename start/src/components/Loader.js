import styled from "styled-components";
import RingLoader from "react-spinners/RingLoader";

function Loader() {
  return (
    <Container>
      <RingLoader size={42} color={"#FF5D73"} loading={true} />
    </Container>
  );
}

export default Loader;

const Container = styled.span`
  z-index: 100;
  background: rgba(0, 0, 0, 0.8);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
