import "./App.css";
import DeviceTile from "./components/DeviceTile";
import AddDevice from "./components/AddDevice";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { defaultDevices } from "./data";

function App() {
  const home = {
    name: "CapTech's Home",
    devices: defaultDevices
  }

  const addDevice = () => {
    console.log("add device");
  }

  const deleteDevice = () => {
    console.log("delete device");
  }

  return (
    <div className="App">
      <Header title={home.name} />
      <div className="device-grid">
        {home.devices.map((d, i) => (
          <DeviceTile key={i} device={d} onDelete={deleteDevice}/>
        ))}
        <AddDevice onAdd={addDevice}/>
      </div>
      <Footer />
    </div>
  );
}

export default App;
