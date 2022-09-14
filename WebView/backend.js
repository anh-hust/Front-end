const express = require("express");
const Datastore = require("nedb");

const app = express();
app.listen(3000, () => console.log("Listening on port 3000"));
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

/*Create and load database*/
const database = new Datastore("database.db");
const databaseImg = new Datastore("databaseImg.db");
database.loadDatabase();
databaseImg.loadDatabase();
// test insert data into database
// database.insert({ name: "Tuan Anh", status: "fun" });

/*TODO server send GET request to database and send queried data to client */
app.get("/issPos", (request, response) => {
  // find all data and send it to client
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    console.log("I send data to client ");
    console.log(data);
    response.send(data);
  });
});

/*TODO server-side take data from body of POST request from client-side and "jsonize" it, send respone back to client*/
app.post("/issPos", (request, response) => {
  console.log("Server side: I got a request!!");
  // console.log(request.body);

  const data = request.body;
  // create timestamp from 1970
  const timestamp = Date.now();
  // assign timestamp for data of client POST request
  data.timestamp = timestamp;

  // var doc = {
  //   timestamp: timestamp,
  //   latitude: data.latitude,
  //   longitude: data.longitude,
  //   img: data.image64,
  // };

  /* store data into database server */
  database.insert(data);

  console.log(data);

  // send respone back to the client
  // response.json({
  //   status: "success",
  //   timestamp: data.timestamp,
  //   latitude: data.latitude,
  //   longitude: data.longitude,
  // });

  /* send response back to client */
  response.json(data.latitude);
});

app.post("/img", (request, response) => {
  console.log("Server side: I got a request!!");
  // console.log(request.body);

  const data = request.body;
  // create timestamp from 1970
  const timestamp = Date.now();
  // assign timestamp for data of client POST request
  data.timestamp = timestamp;

  // var doc = {
  //   timestamp: timestamp,
  //   latitude: data.latitude,
  //   longitude: data.longitude,
  //   mood: data.mood,
  //   img: data.image64,
  // };

  /* store data into database server */
  databaseImg.insert(data);

  console.log(data);

  // send respone back to the client
  // response.json({
  //   status: "success",
  //   timestamp: data.timestamp,
  //   latitude: data.latitude,
  //   longitude: data.longitude,
  // });

  /* send response back to client */
  response.json(data);
});
