const express = require("express");
const router = express.Router();
const Rooms = require("../utilitys/Rooms");

router.get("/:room/:playerName/:userID", (req, res) => {
  let room = req.params.room;
  let playerName = req.params.playerName;
  let userID = req.params.userID;

  if (Rooms.data[room] && Rooms.data[room].interval != null){
    res.status(400).json({ response: "The room is closed" });
  }
  else if (!Rooms.createRoom(room, playerName, userID)) {
    res.status(400).json({ response: "user already exist in room or room limit" });
  } else {
    console.log("------------------");
    console.log(Rooms.data[room]);
    console.log("-------------");

    res.status(200).json({ data: Rooms.data[room].players[userID], host: Rooms.data[room].host });
  }
});

module.exports = router;
