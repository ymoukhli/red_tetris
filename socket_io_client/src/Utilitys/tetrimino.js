export const TETRIMINO = {
    0 : { shape : [[0]] , color:'0,0,0'},
    I : {
        shape : [
            [0,0,0,I]
            [0,0,0,I]
            [0,0,0,I]
            [0,0,0,I]
        ],
        color : '120,0,0'
    },
    K : {
        shape : [
            [0,0,K,K]
            [0,0,K,0]
            [0,0,K,0]
            [0,0,0,0]
        ],
        color : '0,120,0'
    },
    E : {
        shape : [
            [E,E,0,0]
            [0,E,0,0]
            [0,E,0,0]
            [0,0,0,0]
        ],
        color : '0,0,120'
    },
    C : {
        shape : [
            [C,C,0,0]
            [C,C,0,0]
            [0,0,0,0]
            [0,0,0,0]
        ],
        color : '230,210,0'
    },
    R : {
        shape : [
            [0,0,R,R]
            [0,R,R,0]
            [0,0,0,0]
            [0,0,0,0]
        ],
        color : '133,0,133'
    },
    T : {
        shape : [
            [0,T,0,0]
            [T,T,T,0]
            [0,0,0,0]
            [0,0,0,0]
        ],
        color : '0,130,130'
    },
    L : {
        shape : [
            [L,L,0,0]
            [0,L,L,0]
            [0,0,0,0]
            [0,0,0,0]
        ],
        color : '45,255,45'
    }
}

export const getRandomTetri = () => {
    const tetriminos = 'LTRCEKI'
    const randomVal = tetriminos[Math.floor(Math.random() * tetriminos.length)]
    return TETRIMINO[randomVal];
}