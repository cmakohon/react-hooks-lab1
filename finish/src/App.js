import "./App.css";
import DeviceTile from "./components/DeviceTile";
import AddDevice from "./components/AddDevice";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import { dataUrl } from "./globals";

function App() {
  const [homeName, setHomeName] = useState("");
  const [devices, setDevices] = useState([]);

  const getHome = () => {
    fetch(`${dataUrl}/getHome?id=vduzEKv3hsweVvBKWmjn`)
    .then(data => data.json())
    .then(data => {
      setDevices(data.result.devices)
      setHomeName(data.result.name);
    })
  }

  useEffect(() => {
    getHome();
  }, [])

  const addDevice = (device) => {
    fetch(`${dataUrl}/addDevice?id=vduzEKv3hsweVvBKWmjn`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        device: device
      })
    })
    .then(data => data.json())
    .then(data => {
      getHome();
    })
  }

  return (
    <div className="App">
      <Header title={homeName} />
      <div className="device-grid">
        {devices.map((d, i) => (
          <DeviceTile key={i} device={d} onDelete={getHome}/>
        ))}
        <AddDevice onAdd={addDevice}/>
      </div>
      <Footer />
    </div>
  );
}

export default App;
