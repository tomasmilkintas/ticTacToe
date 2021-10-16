import React, { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board";
import { calculateWinner } from "./helper";

const App = () => {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [stepNumber, setStepNumber] = useState(0);

    const [boardStyle, setBoardStyle] = useState(0);

    const [xIsNext, setXisNext] = useState(true);

    const [startGame, setStartGame] = useState(false);

    const [nameX, setNameX] = useState("");
    const [name0, setName0] = useState("");

    const [seconds, setSeconds] = useState(30);

    const xO = xIsNext ? `X` : `0`;
    const names = xIsNext ? `${nameX}` : `${name0}`;
    const winnerNames = xO === `X` ? `${name0}` : xO === `0` ? `${nameX}` : null;

    const winner = calculateWinner(history[stepNumber], boardStyle);

    let status;
    if (winner && winner !== "draw") {
        status = `Winner: ${winnerNames}!`;
    } else if (winner && winner === "draw") {
        status = `It's a ${winner}!`;
    } else {
        status = `Next player: ${names}`;
    }

    const handleClick = (i) => {
        const historyPoint = history.slice(0, stepNumber + 1);
        const current = historyPoint[stepNumber];
        const squares = [...current];
        // return if won or occupied
        if (winner || squares[i]) return;
        // select square
        squares[i] = xO;
        setHistory([...historyPoint, squares]);
        setStepNumber(historyPoint.length);
        setXisNext(!xIsNext);
        setSeconds(30);
    };

    const jumpTo = (step) => {
        setStepNumber(step);
        setXisNext(step % 2 === 0);
    };

    const renderMoves = () =>
        history.map((_step, move) => {
            const destination = move ? `Go to move #${move}` : "Play Again";
            return (
                <li key={move}>
                    <button onClick={() => jumpTo(move)}>{destination}</button>
                </li>
            );
        });

    const boardSize = (size) => {
        const squares = parseInt(size);
        setBoardStyle(squares);
        setHistory([Array(squares).fill(null)]);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                setSeconds(30);
                setXisNext(!xIsNext);
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, [xIsNext, seconds, startGame]);

    return (
        <div>
            <h1>Tic Tac Toe</h1>

            {!startGame && (
                <div>
                    <h3>Enter your names:</h3>
                    <div className="row">
                        <h3>Player1:</h3>
                        <input onChange={(e) => setNameX(e.target.value)} />
                    </div>
                    <div className="row">
                        <h3>Player2:</h3>
                        <input onChange={(e) => setName0(e.target.value)} />
                    </div>
                    <div className="row select">
                        <h3>Select the size of the board:</h3>
                        <select onChange={(e) => boardSize(e.target.value)} defaultValue="Board">
                            <option disabled>Board</option>
                            <option value="9">3 x 3</option>
                            <option value="16">4 x 4</option>
                            <option value="25">5 x 5</option>
                        </select>
                    </div>
                    <div className="info-wrapper">
                        <button
                            disabled={!boardStyle}
                            className={!boardStyle ? `disabledButton` : null}
                            onClick={() => setStartGame(true)}
                        >
                            Build Board
                        </button>
                    </div>
                </div>
            )}

            {startGame && (
                <div className="container">
                    {!winner && <h2>Timer: {seconds}s</h2>}
                    <Board squares={history[stepNumber]} onClick={handleClick} style={boardStyle} />
                    <div className="info-wrapper">
                        <div>
                            <h3>History</h3>
                            <button onClick={() => setStartGame(false)}>Back to start</button>
                            {renderMoves()}
                        </div>

                        <h3>{status}</h3>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
