import ListofPlayers, {
  ScoreBelow70
} from "./ListofPlayers";

import {
  OddPlayers,
  EvenPlayers,
  ListofIndianPlayers,
  IndianPlayers
} from "./IndianPlayers";

function App() {

  let flag = false;

  const IndianTeam = [
    "Sachin",
    "Dhoni",
    "Virat",
    "Rohit",
    "Yuvraj",
    "Raina"
  ];

  if (flag === true) {
    const players = [
      { name: "Jack", score: 50 },
      { name: "Michael", score: 70 },
      { name: "John", score: 40 },
      { name: "Ann", score: 61 },
      { name: "Elisabeth", score: 61 },
      { name: "Sachin", score: 95 },
      { name: "Dhoni", score: 100 },
      { name: "Virat", score: 84 },
      { name: "Jadeja", score: 64 },
      { name: "Raina", score: 75 },
      { name: "Rohit", score: 80 }
    ];

    return (
      <div>
        <h1>List of Players</h1>

        <ListofPlayers players={players} />

        <hr />

        <h1>List of Players having Scores Less than 70</h1>

        <ScoreBelow70 players={players} />
      </div>
    );
  } else {
    return (
      <div>
        <h1>Indian Team</h1>

        <h2>Odd Players</h2>
        <OddPlayers IndianTeam={IndianTeam} />

        <hr />

        <h2>Even Players</h2>
        <EvenPlayers IndianTeam={IndianTeam} />

        <hr />

        <h2>List of Indian Players Merged</h2>
        <ListofIndianPlayers IndianPlayers={IndianPlayers} />
      </div>
    );
  }
}

export default App;