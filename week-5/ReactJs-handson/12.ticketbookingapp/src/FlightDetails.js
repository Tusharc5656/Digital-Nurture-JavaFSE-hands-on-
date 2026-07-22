function FlightDetails() {
  return (
    <div>
      <h2>Flight Details</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Flight</th>
            <th>From</th>
            <th>To</th>
            <th>Price</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>AI101</td>
            <td>Delhi</td>
            <td>Mumbai</td>
            <td>₹5000</td>
          </tr>

          <tr>
            <td>AI202</td>
            <td>Chennai</td>
            <td>Bangalore</td>
            <td>₹3500</td>
          </tr>

          <tr>
            <td>AI303</td>
            <td>Kolkata</td>
            <td>Hyderabad</td>
            <td>₹4500</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default FlightDetails;