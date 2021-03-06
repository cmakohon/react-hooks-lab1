import "./App.css";
import { useEffect } from "react";
import DeviceTile from "./components/DeviceTile";
import AddDevice from "./components/AddDevice";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import { useFetch } from "./hooks/useFetch";
import { getHome } from "./homeAPI";

function App() {
  const [home, loading, fetchHome] = useFetch(getHome, {
    name: "",
    devices: []
  });

  useEffect(() => {
    fetchHome();
  }, []);

  return (
    <div className="App">
      {loading && <Loader />}
      <Header title={home.name} />
      <div className="device-grid">
        {home.devices.map((d, i) => (
          <DeviceTile key={i} device={d} onDelete={fetchHome} />
        ))}
        <AddDevice onAdd={fetchHome} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
