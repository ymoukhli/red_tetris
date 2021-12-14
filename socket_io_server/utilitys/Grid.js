const Grid = class {
    constructor(width, height) 
    {
        this.width = width;
        this.height = height;
        this.playground =  Array.from(Array(height), () => new Array(width).fill([0,'clear']));
    }
}

exports.Grid = Grid;