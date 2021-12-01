export const generateGrid = (width, height) => {
    return Array.from(Array(height), () => new Array(width).fill([0,'clear']));
}