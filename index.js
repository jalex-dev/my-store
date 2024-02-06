const express = require("express");
const routerApi = require("./routers");

const cors = require('cors');

const {logErrors, errorsHandler,boomErrorsHandler} = require('./middlewares/error.handler')
const app = express();
const port = 3000;
app.use(express.json()); // for parsing application/json)

const whitelist = ['http://localhost:8080']// son los mismos (si pego los links platzi me impide comentar)
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'), false);
    }
  }
}

app.use(cors(options));
app.get("/", (req, res) =>{
  res.send("Hola mi server en Express");
});

app.listen(port, () =>{
  console.log("My port: " + port);
});

app.get("/api/", (req, res) =>{
  let data = {
    name:"JOAO ALEX",
    lastname:"RODRIGUEZ"
  };
  res.json(data);
});

routerApi(app);
app.use(logErrors);
app.use(boomErrorsHandler);
app.use(errorsHandler);





