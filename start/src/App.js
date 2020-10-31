import "./App.css";
import DeviceTile from "./components/DeviceTile";
import AddDevice from "./components/AddDevice";
import Header from "./components/Header";
import { AiFillGithub } from "react-icons/ai";
import { defaultDevices } from "./data";

function App() {
  const homeName = "CapTech's Home";
  let devices = defaultDevices;

  const addDevice = () => {
    console.log("add device");
  }

  return (
    <div className="App">
      <Header title={homeName} />
      <div className="device-grid">
        {devices.map((d, i) => (
          <DeviceTile key={i} device={d}/>
        ))}
        <AddDevice onAdd={addDevice}/>
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
