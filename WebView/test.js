/*TODO: Send POST request to server ==> work so cool*/
async function sendPOST() {
  const fetch = require("node-fetch");

  const latitude = 15.234567;
  const longitude = 123.243678;
  const pos = { latitude, longitude };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pos),
  };
  const res = await fetch("https://anhbt.ddns.net/issPos", options);
  const json = await res.json();
  console.log("POST request sending...\n", json);
}

async function sendGET() {
  const fetch = require("node-fetch");

  const data = await fetch("https://anhbt.ddns.net/issPos");
  const json = await data.json();
  console.log(data.body);
  // console.log(data[0].latitude);
}
sendGET();
// sendPOST();
