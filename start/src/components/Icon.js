import { AiOutlineBulb, AiOutlineVideoCamera } from "react-icons/ai";
import { CgScreen, CgMusicSpeaker } from "react-icons/cg";
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
      case "SPEAKER":
        icon = <CgMusicSpeaker />;
        break;
      case "CAMERA":
        icon = <AiOutlineVideoCamera />;
        break;
      default:
        break;
    }
    return icon;
  };

  return getIcon(type);
}

export default Icon;
