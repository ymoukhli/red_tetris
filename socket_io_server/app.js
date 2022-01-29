
const express = require('express')
const cors = require('cors')
const app = express()
const server = require('http').Server(app);
const sockets = require('./sockets')
require("dotenv").config();

io = sockets.startSocketServer(server);

app.set('socketio', io);

app.use(cors())


const router = express.Router()
app.use('/', router)


// log the call's in the api side
router.use((req, res, next) => {
  const path = req.originalUrl.replace(/\?.*$/, "");
  if (Object.keys(req.query).length > 0) {
    console.log(req.method, path, req.query);
  } else {
    console.log(req.method, path);
  }
  next(); // make sure we go to the next routes and don't stop here
});

/*-----------------------------------*/

//in here we are going to require the module files for all the data we have in the data base
router.use('/rooms', require('./controllers/rooms'));  


// controle the routs cals in app routes
router.use((req, res) => {
  console.log("ROUTER 404");
  return res.status(404).json({ err: "404" });
});

const PORT = process.env.PORT || 80;
server.listen(PORT);
console.log(`Started on ${PORT}`);
