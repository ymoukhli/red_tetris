export const rotateArr = (arr)=> {
    if (!arr)
        return ;
    const tmp = [];
    const len = arr.length;
  
    for (let y = 0; y < len; y++ )
    {
        let subTmp = [];
        for (let x = 0; x < len; x++)
        {
            subTmp.unshift(arr[x][y]);
        }
        tmp.push(subTmp);
    }    
    return tmp;
}

export const checkLineInGrid = (grid) => {
    
    let arr = [];
    for (let y = 0; y < grid.height; y++)
    {
        for (let x = 0; x < grid.width && grid[y][x][1] === "stay"; x++)
        {
            if (x + 1 >= grid.width)
            {
                arr.push(y);
            }
        }
    }
    return arr;
}

export const checkColision = (xOffset, yOffset,grid, tetris, arr = tetris.tetrimino) => {
    for (let y = 0; y < arr.length; y++)
    {
        const nextPosY = y + tetris.pos.y + yOffset;
        for (let x = 0; x < arr[y].length; x++)
        {
            if (arr[y][x] !== 0)
            {
                const nextPosX = x + tetris.pos.x + xOffset;
                if (nextPosX >= dimenssion.width || nextPosX < 0 || nextPosY >= dimenssion.height || grid[nextPosY][nextPosX][1] === "stay")
                {
                    return true;
                }
            }       
        }
    }
    return false;
}