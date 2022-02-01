const express = require("express");
const router = express.Router();
const Rooms = require("../utilitys/Rooms");

router.get("/:room/:playerName/:userID", (req, res) => {
  let room = req.params.room;
  let playerName = req.params.playerName;
  let userID = req.params.userID;

  if (!Rooms.createRoom(room, playerName, userID))
    res
      .status(400)
      .json({ response: "user already exist in room or room limit" });
  else {
    console.log("------------------");
    console.log(Rooms.data[room]);
    console.log("-------------");

    res.send({ room, response: "Hello there !" }).status(200);
  }
});

module.exports = router;
