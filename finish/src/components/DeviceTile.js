import styled from "styled-components";
import { useState } from "react";
import { motion } from "framer-motion";
import { CgRemove } from "react-icons/cg";
import Icon from "./Icon";
import Loader from "./Loader";
import SwitchWrapper from "./SwitchWrapper";
import { confirmAlert } from "react-confirm-alert"; // Import
import "../custom-confirm.css"; // Import css
import { updateDeviceStatus, deleteDevice } from "../homeAPI";
import { useFetch } from "../hooks/useFetch";

function DeviceTile({device, onDelete}) {
  const [active, setActive] = useState(device.state === "ON");
  const [deleteResult, deleteLoading, deleteDev] = useFetch(deleteDevice); 
  const [updateResult, updateLoading, updateDev] = useFetch(updateDeviceStatus); 

  const toggleState = async (change) => {
    await updateDev(device.id, change ? "ON" : "OFF");
    setActive(change)
  };

  const handleDelete = async () => {
    await deleteDev(device);
    onDelete();
  }

  const confirmDelete = () => {
    confirmAlert({
      title: 'Delete Device',
      message: 'Are you sure you want to remove this device from your home?',
      buttons: [
        {
          label: 'Yes',
          onClick: handleDelete
        },
        {
          label: 'No',
          onClick: () => null
        }
      ]
    });
  };

  return (
    <motion.div whileHover={{ scale: 1.02 }}>
      <Container>
      {(deleteLoading || updateLoading) && <Loader />}
        <Row>
          <DeviceName>{device.name}</DeviceName>
          <IconContainer active={active}>
            <Icon type={device.type} />
          </IconContainer>
        </Row>
        <Row style={{ alignItems: "center" }}>
          <motion.div whileTap={{ scale: 0.9 }}>
            <CgRemove
              onClick={confirmDelete}
              style={{
                fontSize: "18pt",
                cursor: "pointer",
              }}
            />
          </motion.div>
          <SwitchWrapper
            active={active}
            onChange={toggleState}
          />
        </Row>
      </Container>
    </motion.div>
  );
}

export default DeviceTile;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  background-color: #576175;
  border: 3px solid #576175;
  border-radius: 8px;
  height: 185px;
  width: calc(100% - 3rem);
  padding: 1.5rem;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const IconContainer = styled.div`
  font-size: 36pt;
  margin-left: 1rem;
  color: ${(props) => (props.active ? "#FF5D73" : "inherit")};
  transition: 0.3s;
`;

const DeviceName = styled.span`
  font-size: 20pt;
  font-weight: 100;
`;
