import Row from './Row'

export default function Board2048 ({ board, lose, win}) {

    let boardClassName = "board";
    let infoClassName = "info";
    let outSentence = "No funding this year QAO";
    let phdSentence = "You should study a PhD!";

    return (
        <>
        <table className={boardClassName+(lose?" game-over-board":"")} id="board-full">
            <tbody>
                {board.map((row_vector, row_idx) => (<Row key={row_idx} row_vec={row_vector} index={row_idx}/>))}
            </tbody>
        </table>
        <div className={infoClassName+(lose?" game-over-wrapper":"")} id="game-over-info">
            <span id="game-over-text">{(win?phdSentence:outSentence)}</span>
            <div className="button" id="game-over-button">Try again</div>
        </div>
        </>
    );
};