import Player from "./Components/Player.jsx";
import GameBoard from "./Components/GameBoard.jsx";
import {useState} from "react";
import Log from "./Components/Log.jsx";

function deriveActivePlayer(gameTurns){
    let currentPlayer = 'X';

    if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
        currentPlayer = 'O';
    }

    return currentPlayer;
}

function App() {
    const [gameTurns, setGameTurns] = useState([]);

    // 중복되는 기능의 useState를 제거하기 위해 아래의 값을 제거를 할 때 다음과 같이 추가가 될 수 있다.
    //const [activePlayer, setActivePlayer] = useState('X');

    /*let currentPlayer = 'X';

    if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
        currentPlayer = 'O';
    }
    // 하지만, 아래의 코드하고 중복되는 코드이므로 이를 대치하기 위해 헬퍼함수를 사용하여 중복을 최소화한다.
    */

    const activePlayer = deriveActivePlayer(gameTurns);

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
    return (
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player initialName="Player 1" symbol="X" isActive={activePlayer === "X"}/>
            <Player initialName="Player 2" symbol="O" isActive={activePlayer === "O"}/>
          </ol>

          <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns}/>
        </div>
        <Log turns={gameTurns}/>
      </main>
    )
}

export default App
