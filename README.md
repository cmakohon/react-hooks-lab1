# react-hooks-lab1
Repository for Lab 1 of CapTech's React learning series focused on React Hooks.

## Prerequisites
- Node installed on your machine (v12 or higher)
- Git installed on your machine 

## Setup instructions
1. Clone this repository to your local machine.
2. On your machine, cd into the `start` directory of this project.
3. Once inside the directory, run `npm install`.
4. `rpm run start` will launch the application.

## Introduction
![Virtual Smart Home Dashboard](./Dashboard.png)

In this lab, we will be building a virtual smart home dashboard using React Hooks. Our dashboard will have the following functionality:
- Display a list of our smart devices
- Add a device
- Delete a device
- Toggle device on/off 

The basic components and styling of the application have already been implemented for you, as we want to jump right into using hooks. 

We will start the lab by implementing local state across the application using the `useState` hook. Then, we will load our home from an API call with `useEffect` when our app initializes. We will also convert the various functions across the application to hit our API, adding loading states along the way. Finally, we will abstract some of the reused logic from each of our API calls into our own custom `useFetch` hook. 

## Part 1: Add local state using `useState`
Once you have the application up and running, you'll notice that none of the core functionality is actually working. We will need to add local state to our components to keep track of any changes we make from the UI. 

The first change that we will make to our application will be in `DeviceTile.js`. Currently, clicking the toggle switch on the device doesn't change anything. We want the color of the icon in the top corner of our tile to reflect the state of our device. Let's use the `useState` hook to accomplish this.

```
import { useState } from "react";

function DeviceTile({device, onDelete}) {
  const [active, setActive] = useState(device.state === "ON");
  ...
 }
```
Now, we can reference our DeviceTile's on/off state (initialized based on the component's props) with the `active` variable, and we can update our state using the `setActive` function that was returned by the `useState` hook. Update our return statement to reference our new `active` state anywhere we were previously using `device.state === "ON"`.

Next, we'll need to call our `setActive` function when our SwitchWrapper component changes. We can do this by updating the `toggleState` method that has already been defined at the top of the component.

```
const toggleState = (change) => setActive(change);
```
If everything is working properly, our toggle switch should now correctly update the `DeviceTile`'s state!

Let's work on adding/deleting devices now. Currently, we are simply logging the add/delete events to the console from the `App.js` component. We need to be able to update the state in `App.js` since it contains the master list of our devices. Let's start by adding state to our `App.js` component:

```
import { useState } from "react";

function App() {
  const [home, setHome] = useState({
    name: "CapTech's Home",
    devices: defaultDevices
  });
  ...
}
```
Now that we are tracking our home state, we can modify our `addDevice` and `deleteDevice` functions to update our home's state with `setHome`.

```
function App() {
  ...
  const addDevice = (device) => {
    setHome({
      ...home,
      devices: [...home.devices, device]
    });
  }
  const deleteDevice = (device) => {
    setHome({
      ...home,
      devices: [...home.devices.filter(d => d.name !== device.name)]
    });
  }
  ...
}
```
*Note: We are deleting only based on device names matching - normally we would want a unique key to match on, but for the purposes of this lab matching on the name will suffice.*

Next, we need to update our `DeviceForm` and `DeviceTile` components to pass back the devices that they are adding and deleting respectively.

```
function DeviceForm(props) {
  ...
  const onSubmit = (formData) => {
    props.onSubmit({
      name: formData.deviceName,
      type: formData.deviceType,
      state: "OFF"
    });
    props.onClose();
  }
  ...
}

function DeviceTile({device, onDelete}) {
  ...
  const confirmDelete = () => {
    confirmAlert({
      title: 'Delete Device',
      message: 'Are you sure you want to remove this device from your home?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => onDelete(device)
        },
        {
          label: 'No',
          onClick: () => null
        }
      ]
    });
  };
  ...
}
```

Congratulations, you now have a working Virtual Smart Home Dashboard! In the next section we will work on integrating this with an actual API so that our changes can be persisted.

## Part 2: Integrate with API using `useEffect`
First off, you will need to visit [this URL](https://virtual-smart-home-8c6b8.web.app/) to create your personal instance of a smart home. Copy the ID that the page gives you after you submit your home name and paste it in the `yourHomeId` variable in the `homeAPI.js` file within your project.

*If you are curious about the backend implementation, you can view the repository [here](https://github.com/cmakohon/virtual-smart-home). Feel free to clone the project later and spin up your own firebase emulator locally.*

The `homeAPI.js` file already contains the 4 functions that we will be using to make our API calls. We just need to call them in the correct components and update our state from there. Let's start with our initial home fetch in `App.js`. To do this, we can use the `useEffect` hook to execute code once our component mounts. By passing an empty array as the second parameter to `useEffect`, we ensure that the code inside the `useEffect` body will only be run once.

```
import { useState, useEffect } from "react";
import { getHome } from './homeAPI';

function App() {
  const [home, setHome] = useState({
    name: "",
    devices: []
  });

  const fetchHome = async () => {
    const response = await getHome();
    const data = await response.json();
    setHome(data.result);
  }
  
  useEffect(() => {
    fetchHome();
  }, []);
  ...
}
```
You'll notice that we changed the initial state passed into our `useState` hook to be a home with no name and an empty array of devices. This will prevent any errors when trying to render the data from the return statement. 

Once our `getHome` call finishes, we get the json data from the response and pass it back to our `setHome` function. This will automatically trigger a re-render because our local state will be changing. Refresh your page to see our new API call in action.

The transition from our initial page load to when our API call returns is a little jarring. Let's track our loading state using another `useState` hook and use the `Loader` component that is already available in our `components` folder.

```
import Loader from "./components/Loader";

function App() {
  ...
  const [loading, setLoading] = useState(false);

  const fetchHome = async () => {
    setLoading(true);
    const response = await getHome();
    const data = await response.json();
    setHome(data.result);
    setLoading(false);
  }
  ...
  return (
    <div className="App">
      {loading && <Loader />}
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
```
Now things are starting to look better! Next up is to implement the remaining API calls into our application (we'll track loading state for these calls as well). Let's start with toggling devices on/off in our `DeviceTile` component. 

```
import { updateDeviceStatus } from '../homeAPI';
import Loader from "./Loader";

function DeviceTile({device, onDelete}) {
  ...
  const [loading, setLoading] = useState(false);

  const toggleState = async (change) => {
    setLoading(true);
    const response = await updateDeviceStatus(device.id, change ? "ON" : "OFF");
    const data = await response.json();
    setLoading(false);
    setActive(change);
  };
  ...
  return (
    <motion.div whileHover={{ scale: 1.02 }}>
      <Container>
        {loading && <Loader />}
        <*rest of the body* />
      </Container>
    </motion.div>
  );
}
```
The device's state should now be persisting properly. While we're here, let's go ahead and implement the delete functionality as well.

```
import { updateDeviceStatus, deleteDevice } from '../homeAPI';

function DeviceTile({device, onDelete}) {
  ...
  const handleDelete = async () => {
    setLoading(true);
    const response = await deleteDevice(device);
    const data = await response.json();
    setLoading(false);
    onDelete(device)
  }

  const confirmDelete = () => {
    confirmAlert({
      title: 'Delete Device',
      message: 'Are you sure you want to remove this device from your home?',
      buttons: [
        {
          label: 'Yes',
          onClick: handleDelete
        },
        {
          label: 'No',
          onClick: () => null
        }
      ]
    });
  };
  ...
}
```
Now that we're using real device objects from a database, we have IDs associated with each device. Let's quickly update our delete handler in `App.js` to account for this.

```
function App() {
  ...
  const deleteDevice = (device) => {
    setHome({
      ...home,
      devices: [...home.devices.filter(d => d.id !== device.id)]
    });
  }
  ...
}
```
The only functionality left to implement now is the API call for adding a device. Let's go ahead and make that change in our `DeviceForm` component.

```
import { useState } from "react";
import { addDevice } from '../homeAPI';
import Loader from "./Loader";

function DeviceForm(props) {
  ...
  const [loading, setLoading] = useState(false);
  ...
  const onSubmit = async (formData) => {
    setLoading(true);
    const response = await addDevice({
      name: formData.deviceName,
      type: formData.deviceType,
      state: "OFF"
    });
    const data = await response.json();
    setLoading(false);
    props.onSubmit();
    props.onClose();
  }

  return (
    <Container>
      {loading && <Loader />}
      <*rest of the body* />
    </Container>
  );
}
```
Our form should be hitting our API now. Since our API does not return the newly created device in the response (that's my bad), we should have our `App` component refetch our home after we create a new device so that it knows about the device's new ID in case you wanted to update or delete it afterwards. Let's make the change to `App.js`.

```
function App() {
  ...
  const addDevice = () => {
    fetchHome();
  }
  ...
}
```
Perfect! Our app is now connected to all of our API endpoints.

## Part 3: Abstract reused fetch logic into a custom hook
You might have noticed a very similar pattern in several places in our code by this point in the lab. Whenever we're making an API call in our app, we're almost always doing 3 things:

1. Tracking loading state
2. Making the actual call with `fetch`
3. Doing something with the returned data (really only for the getHome call in our case)

This is the perfect opportunity to create our own custom hook: `useFetch`. Creating custom hooks is not complicated, and we just need to abide by React's rules for custom hooks:

> "A custom Hook is a JavaScript function whose name starts with ”use” and that may call other Hooks."

Let's create a new folder directly under our `src` directory called `hooks`. In that folder, create the following file: `useFetch.js`

```
import { useState } from "react";

export function useFetch(asyncFunc, initialState) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(initialState);

  const fetchData = async (...args) => {
    setLoading(true);
    const response = await asyncFunc(...args);
    const data = await response.json();
    setData(data.result);
    setLoading(false);
  }

  return [data, loading, fetchData];
}
```
