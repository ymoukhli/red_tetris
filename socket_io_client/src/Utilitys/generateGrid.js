export const dimenssion = { width: 12, height: 20};

export const generateGrid = (width, height) => {
    return Array.from(Array(dimenssion.height), () => new Array(dimenssion.width).fill([0,'clear']));
}