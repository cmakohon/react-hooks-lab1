import "./App.css";
import DeviceTile from "./components/DeviceTile";
import AddDevice from "./components/AddDevice";
import Header from "./components/Header";
import Footer from "./components/Footer";
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
      <Footer />
    </div>
  );
}

export default App;
