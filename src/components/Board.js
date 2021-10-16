import Square from "./Square";

const Board = ({ squares, onClick, style }) => (
    <div
        className="board"
        style={{
            gridTemplate: `repeat(${Math.sqrt(style)}, 1fr) / repeat(${Math.sqrt(style)}, 1fr)`,
        }}
    >
        {squares.map((square, i) => (
            <Square key={i} value={square} onClick={() => onClick(i)} />
        ))}
    </div>
);

export default Board;
