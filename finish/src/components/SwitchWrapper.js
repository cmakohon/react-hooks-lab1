import Switch from "react-switch";

function SwitchWrapper(props) {
  return (
    <Switch
            checked={props.active}
            onChange={props.onChange}
            onColor="#FFD6DC"
            onHandleColor="#FF5D73"
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={48}
            className="react-switch"
            id="material-switch"
          />
  );
}

export default SwitchWrapper;
