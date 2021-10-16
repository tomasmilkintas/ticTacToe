export const calculateWinner = (squares, actualSquares) => {
    const lines3 = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const lines4 = [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11],
        [12, 13, 14, 15],
        [0, 4, 8, 12],
        [1, 5, 9, 13],
        [2, 6, 10, 14],
        [3, 7, 11, 15],
        [0, 5, 10, 15],
        [3, 6, 9, 12],
    ];

    const lines5 = [
        [0, 1, 2, 3, 4],
        [5, 6, 7, 8, 9],
        [10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19],
        [20, 21, 22, 23, 24],
        [0, 5, 10, 15, 20],
        [1, 6, 11, 16, 21],
        [2, 7, 12, 17, 22],
        [3, 8, 13, 18, 23],
        [4, 9, 14, 19, 24],
        [0, 6, 12, 18, 24],
        [4, 8, 12, 16, 20],
    ];

    if (actualSquares === 9) {
        for (let i = 0; i < lines3.length; i++) {
            const [a, b, c] = lines3[i];
            if (!squares.includes(null)) {
                return "draw";
            } else if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
    } else if (actualSquares === 16) {
        for (let i = 0; i < lines4.length; i++) {
            const [a, b, c, d] = lines4[i];
            if (!squares.includes(null)) {
                return "draw";
            } else if (
                squares[a] &&
                squares[a] === squares[b] &&
                squares[a] === squares[c] &&
                squares[a] === squares[d]
            ) {
                return squares[a];
            }
        }
    } else if (actualSquares === 25) {
        for (let i = 0; i < lines5.length; i++) {
            const [a, b, c, d, e] = lines5[i];
            if (!squares.includes(null)) {
                return "draw";
            } else if (
                squares[a] &&
                squares[a] === squares[b] &&
                squares[a] === squares[c] &&
                squares[a] === squares[d] &&
                squares[a] === squares[e]
            ) {
                return squares[a];
            }
        }
    } else {
        return null;
    }
};
