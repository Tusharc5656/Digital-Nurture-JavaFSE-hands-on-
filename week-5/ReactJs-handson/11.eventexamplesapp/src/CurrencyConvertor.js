import React, { useState } from "react";

function CurrencyConvertor() {
  const [rupees, setRupees] = useState("");
  const [euro, setEuro] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const convertedValue = (parseFloat(rupees) / 90).toFixed(2);
    setEuro(convertedValue);
  };

  return (
    <div>
      <h2>Currency Convertor</h2>

      <form onSubmit={handleSubmit}>
        <label>Indian Rupees:</label>

        <input
          type="number"
          value={rupees}
          onChange={(e) => setRupees(e.target.value)}
        />

        <button type="submit">Convert</button>
      </form>

      {euro && (
        <h3>
          Euro : € {euro}
        </h3>
      )}
    </div>
  );
}

export default CurrencyConvertor;