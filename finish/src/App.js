import "./App.css";
import DeviceTile from "./components/DeviceTile";
import AddDevice from "./components/AddDevice";
import Header from "./components/Header";
import { AiFillGithub } from "react-icons/ai";
import { defaultDevices } from "./data";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

function App() {
  const homeName = "Collin's Home";
  const devices = defaultDevices;

  return (
    <div className="App">
      <Header title={homeName} />
      <div className="device-grid">
        {devices.map((d, i) => (
          <DeviceTile key={i} device={d}/>
        ))}
        <AddDevice />
      </div>
      <a href="https://github.com/cmakohon" className="footer">
        <AiFillGithub
          style={{
            marginRight: ".5rem",
            fontSize: "16pt",
            marginBottom: "-4px",
          }}
        />
        github.com/cmakohon
      </a>
    </div>
  );
}

export default App;
