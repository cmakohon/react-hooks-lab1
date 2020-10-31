import styled from "styled-components";
import { motion } from "framer-motion";
import { AiOutlinePlusCircle } from "react-icons/ai";

function AddDevice() {
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Container>
        <Row>
          <span>Add Device</span>
          <AiOutlinePlusCircle
            style={{ marginLeft: "0.5rem", color: "#FF5D73" }}
          />
        </Row>
      </Container>
    </motion.div>
  );
}

export default AddDevice;

const Container = styled.div`
  border-radius: 8px;
  border: 3px dashed #576175;
  height: 175px;
  width: calc(100% - 3rem);
  padding: 1.5rem;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  font-size: 16pt;
`;
