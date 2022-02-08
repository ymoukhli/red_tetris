const rotateArr = (arr) => {
  if (!arr) return;
  const tmp = [];
  const len = arr.length;

  for (let y = 0; y < len; y++) {
    let subTmp = [];
    for (let x = 0; x < len; x++) {
      subTmp.unshift(arr[x][y]);
    }
    tmp.push(subTmp);
  }
  return tmp;
};

const checkLineInGrid = (grid) => {
  let arr = [];
  let height = grid.length;
  let width = grid[0].length;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width && grid[y][x][1] === "stay"; x++) {
      if (x + 1 >= width) {
        arr.push(y);
      }
    }
  }
  return arr;
};


const RandomTetros = (nb) => {
  const tetriminos = "LITRCEKI";
  const tetroList = [];
  for (let i = 0; i <= nb; i++) {
    tetroList.push(tetriminos[Math.floor(Math.random() * tetriminos.length)]);
  }
  return tetroList;
}

function checkPlayersExist(players, username) {
  const res = Object.values(players).filter((element) => {
    return element.username == username;
  });

  return(res.length)
}

module.exports = {
  rotateArr,
  checkLineInGrid,
  RandomTetros,
  checkPlayersExist,
};
