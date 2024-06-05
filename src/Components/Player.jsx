import {Component} from "react";
import {useState} from "react";

export default function Player({initialName, symbol, isActive, onChangeName}) {
    const [player, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick() {
        console.log(isEditing);
        // !isEditing 같은 값의 변경의 경우 다음과 같이 함수형태로 지정해주어야한다.
        // 그 이후는 useState가 컴포넌트 변경 당시의 값을 가지고 있지 않기 때문이다.
        /** 예를 들어
         * setIsEditing(!isEditing); // true
         * setIsEditing(!isEditing); // flase
         * 라고 예상하지만 다음 두개의 값은 동일한 컴포넌트 생성 당시의 false를 보고 있게 되있어
         * setIsEditing(!isEditing); // true
         * setIsEditing(!isEditing); // true
         * 형식으로 작업되어 true가 반환된다.
         * 아래와 같이
         * setIsEditing((isEditing) => !isEditing);
         * 으로 할 경우에만 최신의 값을 가지고 오도록 되어있으므로
         * 함수형으로 작성해주도록 하자.
          */
        setIsEditing(e => !e);
        if(isEditing) onChangeName(symbol, player);
    }

    function handleChange(event){
        setPlayerName(event.target.value);
    }

    let playerName = <span className='player-name'>{player}</span>;

    if(isEditing){
        playerName = <input type="text" required value={player} onChange={handleChange}/>;
    }

    return (
        <li className={isActive ? 'active' : undefined}>
              <span className='player'>
                {playerName}
                <span className='player-symbol'>{symbol}</span>
              </span>
            {/*<button onClick={() => handleEditClick()}>Edit</button>*/}
            <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    )
}
