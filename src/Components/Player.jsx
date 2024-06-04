import {Component} from "react";

export default function Player({player, symbol}) {
    return (
        <li>
              <span className='player'>
                <span className='player-name'>{player}</span>
                <span className='player-symbol'>{symbol}</span>
              </span>
            <button>Edit</button>
        </li>
    )
}
