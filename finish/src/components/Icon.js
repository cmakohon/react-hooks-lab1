import { AiOutlineBulb } from "react-icons/ai";
import { CgScreen } from "react-icons/cg";
import { FaTemperatureLow } from "react-icons/fa";

function Icon({type}) {
  const getIcon = (type) => {
    let icon;
    switch (type) {
      case "LIGHT":
        icon = <AiOutlineBulb />;
        break;
      case "TV":
        icon = <CgScreen />;
        break;
      case "THERMOSTAT":
        icon = <FaTemperatureLow />;
        break;
      default:
        break;
    }
    return icon;
  };

  return getIcon(type);
}

export default Icon;
