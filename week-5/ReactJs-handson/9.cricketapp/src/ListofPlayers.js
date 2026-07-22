import React from "react";

function ListofPlayers(props) {
    return (
        <div>
            <ul>
                {
                    props.players.map((item, index) => (
                        <li key={index}>
                            Mr. {item.name} <span>{item.score}</span>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

function ScoreBelow70(props) {

    const players70 = props.players.filter(
        player => player.score <= 70
    );

    return (
        <div>
            <ul>
                {
                    players70.map((item, index) => (
                        <li key={index}>
                            Mr. {item.name} <span>{item.score}</span>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default ListofPlayers;
export { ScoreBelow70 };