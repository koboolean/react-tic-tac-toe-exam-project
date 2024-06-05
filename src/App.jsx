import Player from "./Components/Player.jsx";
import GameBoard from "./Components/GameBoard.jsx";
import {useState} from "react";
import Log from "./Components/Log.jsx";
import { WINNING_COMBINATIONS }  from "./winning-combinations.js";
import GameOver from "./Components/GameOver.jsx";

function deriveActivePlayer(gameTurns){
    let currentPlayer = 'X';

    if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
        currentPlayer = 'O';
    }

    return currentPlayer;
}

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

function App() {
    const [gameTurns, setGameTurns] = useState([]);

    const [players, setPayers] = useState({
        X: 'Player 1',
        O: 'Player 2'
    });

    // 중복되는 기능의 useState를 제거하기 위해 아래의 값을 제거를 할 때 다음과 같이 추가가 될 수 있다.
    //const [activePlayer, setActivePlayer] = useState('X');

    /*let currentPlayer = 'X';

    if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
        currentPlayer = 'O';
    }
    // 하지만, 아래의 코드하고 중복되는 코드이므로 이를 대치하기 위해 헬퍼함수를 사용하여 중복을 최소화한다.
    */

    const activePlayer = deriveActivePlayer(gameTurns);

    let gameBoard = [...initialGameBoard.map(a => [...a])];

    for(const t of gameTurns){
        const {square, player} = t;
        const {row, col} = square;

        gameBoard[row][col] = player;
    }

    let winner;

    for(const combination of WINNING_COMBINATIONS){
        const firstSymbol = gameBoard[combination[0].row][combination[0].column];
        const secondSymbol = gameBoard[combination[1].row][combination[1].column];
        const thirdSymbol = gameBoard[combination[2].row][combination[2].column];

        if(firstSymbol && firstSymbol === secondSymbol && firstSymbol === thirdSymbol){
            winner = players[firstSymbol];
        }
    }

    const hasDraw = gameTurns.length === 9 && !winner;

    function handleSelectSquare(rowIndex, colIndex){
        //setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
        setGameTurns(prevTurns => {
            /*
            let currentPlayer = 'X';

            if(prevTurns.length > 0 && prevTurns[0].player === 'X'){
                currentPlayer = 'O';
            }
            */
            let currentPlayer = deriveActivePlayer(prevTurns);

            return [
                {square: {row: rowIndex, col: colIndex}, player: currentPlayer},
                ...prevTurns
            ];
        });
    }

    function handleRematch(){
        setGameTurns([]);
    }

    function handlePalyerNameChange(symbol, newName){
        setPayers(prevPlayers => {
            return {
                ...prevPlayers,
                [symbol]: newName
            }
        });
    }

    return (
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player initialName="Player 1" symbol="X" isActive={activePlayer === "X"} onChangeName={handlePalyerNameChange}/>
            <Player initialName="Player 2" symbol="O" isActive={activePlayer === "O"} onChangeName={handlePalyerNameChange}/>
          </ol>
          {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRematch}/>}
          <GameBoard onSelectSquare={handleSelectSquare} gameBoard={gameBoard}/>
        </div>
        <Log turns={gameTurns}/>
      </main>
    )
}

export default App
