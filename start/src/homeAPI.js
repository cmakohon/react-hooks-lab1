const dataUrl = "https://us-central1-virtual-smart-home-8c6b8.cloudfunctions.net";
const yourHomeId = "PASTE YOUR ID HERE"

export const getHome = () => {
  return fetch(`${dataUrl}/getHome?id=${yourHomeId}`);
}

export const addDevice = (device) => {
  return fetch(`${dataUrl}/addDevice?id=${yourHomeId}`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      device: device
    })
  });
}

export const updateDeviceStatus = (id, state) => {
  return fetch(`${dataUrl}/updateDeviceState?id=${yourHomeId}`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      update: {
        id: id,
        state: state ? 'ON' : 'OFF'
      }
    })
  })
}

export const deleteDevice = (device) => {
  return fetch(`${dataUrl}/removeDevice?id=${yourHomeId}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      device: device
    })
  })
}