// const app = require("express")(); // not a standard JSAPI but NodeJS's to load modules ~ import or include (so do not run on wweb browser F12)
// /* https://stackoverflow.com/questions/9901082/what-is-this-javascript-require */

// const appid = process.env.APPID;

// app.get("/", (req, res) =>
//     res.send(`appid: ${appid} home page: says hello!`))

// app.get("/app1", (req, res) =>
//     res.send(`appid: ${appid} app1 page: says hello!`))

// app.get("/app2", (req, res) =>
//     res.send(`appid: ${appid} app2 page: says hello!`))

// app.get("/admin", (req, res) =>
//     res.send(`appid: ${appid} ADMIN page: very few people should see this`))

// app.listen(9999, () => console.log(`${appid} is listening on 9999`))

// /** run by $ node app
//  *  or by docker when build it as an image, see in ~/command.md
//  *
//  *  test by browser localhost:9999
//  *
//  * */

/* INFO take position of ISS (Internaltional Station Sattelite) location (using API from LINK https://wheretheiss.at/w/developer) and update each 1.5s */
const api_url = "https://api.wheretheiss.at/v1/satellites/25544";

const map = L.map("issMap").setView([0, 0], 2);
// console.log(mapissTrack); // it will display on console all funtion avai of Leaflet Lib

// @NOTE tile, not title. tile: nền móng
const tile_URL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tile = L.tileLayer(tile_URL, { attribution });
tile.addTo(map);

// create icon
var issIcon = L.icon({
  iconUrl: "/resource/img/iss.png",
  iconSize: [50, 50],
  iconAnchor: [25, 10], // anchor: mỏ neo
  // popupAnchor: [15, 15],
});

const marker = L.marker([0, 0], { icon: issIcon })
  .addTo(map)
  .bindPopup("ISS sattelite's position")
  .openPopup();

/* add click event into map */
map.on("click", function (mapEvent) {
  // here when we click on map ==> on console display for us info from point we click
  console.log(mapEvent);
  // now we mark the point we click
  const { lat, lng } = mapEvent.latlng;
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        autoClose: false, // each point will display the message
        closeOnClick: false,
        className: "popup", // assign class name for popup (the point we mark, so we can css them)
      })
    )
    .setPopupContent("Latitde: " + lat + "<br/>" + "Longitude: " + lng)
    .openPopup();
});

let firstTime = true;

/* get position of ISS and mark it into map*/
async function getISS() {
  const respone = await fetch(api_url);
  const data = await respone.json();
  // const { latitude, longitude } = data;
  const latitude = data.latitude;
  const longitude = data.longitude;

  console.log(latitude, longitude);

  /*TODO update lat and lon ==> so we do not need make a new marker ==> the png will overlap*/
  marker.setLatLng([latitude, longitude]);

  /*TODO the mapview will track the position in the first time*/
  if (firstTime) {
    map.setView([latitude, longitude], 3);
    firstTime = false;
  }

  /*assign value to display HTML*/
  document.getElementById("lat").textContent = latitude;
  document.getElementById("lon").textContent = longitude;

  /* TODO Client-side send POST request to server */
  // const pos = { latitude, longitude };
  // const options = {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(pos),
  // };
  // const res = await fetch("/issPos", options);
  // const json = await res.json();
  // console.log("POST request sending...", json);

  /*TODO: GET data from database using GET request*/
  // const getResponse = await fetch("/issPos");
  // const dataFromdb = await getResponse.json();
  /* @NOTE Now data from database will be an array of objects */
  // console.log("Data from database: ", dataFromdb);
  /*TODO of, so it will query each item of array*/
  // for (let item of dataFromdb) {
  //   console.log(item);
  /*TODO in, so it will return the "name of variable", not the value*/
  //   for (ele in item) {
  //     console.log(ele);
  //     console.log(item[ele]);
  //   }
  // }
}

setInterval(getISS, 2000);
