import styled from "styled-components";
import { motion } from "framer-motion";
import Icon from "./Icon";

function DeviceTile(props) {

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Container>
        <Row>
          <DeviceName>{props.device.name}</DeviceName>
          <IconContainer>
            <Icon type={props.device.type}/>
          </IconContainer>
        </Row>
      </Container>
    </motion.div>
  );
}

export default DeviceTile;

const Container = styled.div`
  background-color: #576175;
  border: 3px solid #576175;
  border-radius: 8px;
  height: 175px;
  width: calc(100% - 3rem);
  padding: 1.5rem;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const IconContainer = styled.div`
  font-size: 36pt;
  margin-left: 1rem;
`;

const DeviceName = styled.span`
  font-size: 22pt;
`;
