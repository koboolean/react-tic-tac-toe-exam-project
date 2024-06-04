import {Component} from "react";
import {useState} from "react";

export default function Player({player, symbol}) {
    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick() {
        console.log(isEditing);
        setIsEditing(!isEditing);
    }

    let playerName = <span className='player-name'>{player}</span>;

    if(isEditing){
        playerName = <input type="text" required/>;
    }

    return (
        <li>
              <span className='player'>
                {playerName}
                <span className='player-symbol'>{symbol}</span>
              </span>
            {/*<button onClick={() => handleEditClick()}>Edit</button>*/}
            <button onClick={handleEditClick}>Edit</button>
        </li>
    )
}
