import styled from "styled-components";
import { useState } from "react";
import { motion } from "framer-motion";
import { CgRemove } from "react-icons/cg";
import Icon from "./Icon";
import SwitchWrapper from "./SwitchWrapper";
import { confirmAlert } from "react-confirm-alert"; // Import
import "../custom-confirm.css"; // Import css
import { dataUrl } from "../globals";

function DeviceTile({device}) {
  const getState = (state) => state === "ON";

  const [active, setActive] = useState(getState(device.state));

  const updateDeviceStatus = (state) => {
    fetch(`${dataUrl}/updateDeviceState?id=vduzEKv3hsweVvBKWmjn`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        update: {
          id: device.id,
          state: state ? 'ON' : 'OFF'
        }
      })
    }).then(data => data.json())
      .then(data => {
        setActive(state);
      })
  }

  const confirmDelete = () => {
    confirmAlert({
      title: 'Delete Device',
      message: 'Are you sure you want to remove this device from your home?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => null
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
            onChange={updateDeviceStatus}
          />
        </Row>
      </Container>
    </motion.div>
  );
}

export default DeviceTile;

const Container = styled.div`
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
