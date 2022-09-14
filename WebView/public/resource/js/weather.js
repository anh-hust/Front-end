const map = L.map("Map").setView([0, 0], 2);
// console.log(map); // it will display on console all funtion avai of Leaflet Lib

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      console.log(`https://www.google.pt/maps/@${latitude}, ${longitude}`);

      const coords = [latitude, longitude];

      L.marker(coords).addTo(map).bindPopup("Your destIP position").openPopup();

      map.setView(coords, 12);

      document.getElementById("lat").textContent = latitude;
      document.getElementById("lon").textContent = longitude;

      /*Submit button click event*/
      const button = document.getElementById("submit");
      button.addEventListener("click", async (event) => {
        const mood = document.getElementById("mood").value;
        video.loadPixels();
        const image64 = video.canvas.toDataURL();

        console.log(image64);

        /*Wrap data and send POST request to server*/
        const data = { latitude, longitude, mood, image64 };
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        };
        const respone = await fetch("/img", options);
        const json = await respone.json();
        console.log(json);
      });
    },
    function () {
      alert("Could not get your position");
    }
  );

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
