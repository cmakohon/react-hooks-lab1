import "./App.css";
import DeviceTile from "./components/DeviceTile";
import AddDevice from "./components/AddDevice";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import { getHome, addDevice } from "./homeAPI";

function App() {
  const [homeName, setHomeName] = useState("");
  const [devices, setDevices] = useState([]);

  const getHomeCb = (data) => {
    setDevices(data.result.devices)
    setHomeName(data.result.name);
  };

  useEffect(() => {
    getHome(getHomeCb);
  }, [])

  return (
    <div className="App">
      <Header title={homeName} />
      <div className="device-grid">
        {devices.map((d, i) => (
          <DeviceTile key={i} device={d} onDelete={() => getHome(getHomeCb)}/>
        ))}
        <AddDevice onAdd={(device) => addDevice(device, () => getHome(getHomeCb))}/>
      </div>
      <Footer />
    </div>
  );
}

export default App;
