import React, { useState } from "react";
import CurrencyConvertor from "./CurrencyConvertor";

function App() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const sayHello = () => {
    alert("Hello! This is a static message.");
  };

  const increase = () => {
    increment();
    sayHello();
  };

  const sayWelcome = (message) => {
    alert(message);
  };

  const handlePress = () => {
    alert("I was clicked");
  };

  return (
    <div style={{ margin: "30px" }}>
      <h1>React Event Examples</h1>

      <h2>Counter : {count}</h2>

      <button onClick={increase}>
        Increment
      </button>

      <button
        onClick={decrement}
        style={{ marginLeft: "10px" }}
      >
        Decrement
      </button>

      <br /><br />

      <button
        onClick={() => sayWelcome("Welcome")}
      >
        Say Welcome
      </button>

      <br /><br />

      <button onClick={handlePress}>
        OnPress
      </button>

      <hr />

      <CurrencyConvertor />
    </div>
  );
}

export default App;