const dataUrl = "https://us-central1-virtual-smart-home-8c6b8.cloudfunctions.net";
const yourHomeId = "vduzEKv3hsweVvBKWmjn"

export const getHome = (cb) => {
  fetch(`${dataUrl}/getHome?id=${yourHomeId}`)
    .then(data => data.json())
    .then(data => cb(data));
}

export const addDevice = (device, cb) => {
  fetch(`${dataUrl}/addDevice?id=${yourHomeId}`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      device: device
    })
  })
  .then(data => data.json())
  .then(data => cb(data))
}

export const updateDeviceStatus = (id, state, cb) => {
  fetch(`${dataUrl}/updateDeviceState?id=${yourHomeId}`, {
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
  }).then(data => data.json())
    .then(data => cb(data));
}

export const deleteDevice = (device, cb) => {
  fetch(`${dataUrl}/removeDevice?id=${yourHomeId}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      device: device
    })
  }).then(data => data.json())
    .then(data => cb(data));
}