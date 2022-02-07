
export default function Socket(io, ac,userID) {

    const {
        setSocket,
        setMultiplayer,
        setGrid,
        addUserInfo,
        setStarted,
        removeGrid,
        updateGrid,
        addGrid,
        updateUserInfo,
        removeUserInfo,
        updateQueue
    } = ac;

    setSocket(io);
    
    io.on("started", () => {
        setStarted(true);
    });
    io.on("respond", (data) => {
        setGrid(data.playground);
    });
    io.on("joined", ({ users, tetriminosQueue }) => {
        console.log("USER ID ", userID);
        addGrid({users, userID});
        addUserInfo({users})
        updateQueue(tetriminosQueue)
    });
  
    io.on("left", ({ username, userID }) => {
        removeGrid({userID});

       removeUserInfo(username);
    });
    
    io.on("display", (arr) => {
        updateQueue(arr);
    })
    io.on("collided", ({ playground, username, score, lines }) => {
        updateGrid({username, playground})
        updateUserInfo({username, score, lines});
    });

    io.on("multy", () => {
        setMultiplayer(true);
    })

    io.on("noMulty", () => {
        setMultiplayer(false);
    })
}