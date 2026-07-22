import office from "./office.jpg";

function App() {
  const officeList = [
    {
      Name: "DBS",
      Rent: 50000,
      Address: "Chennai",
      Image: office,
    },
    {
      Name: "Regus",
      Rent: 75000,
      Address: "Bangalore",
      Image: office,
    },
    {
      Name: "WeWork",
      Rent: 55000,
      Address: "Hyderabad",
      Image: office,
    },
  ];

  return (
    <div style={{ marginLeft: "40px" }}>
      <h1>Office Space, at Affordable Range</h1>

      {officeList.map((item, index) => (
        <div key={index} style={{ marginBottom: "30px" }}>
          <img
            src={item.Image}
            alt="Office Space"
            width="250"
            height="200"
          />

          <h2>Name: {item.Name}</h2>

          <h3
            style={{
              color: item.Rent <= 60000 ? "red" : "green",
            }}
          >
            Rent: Rs. {item.Rent}
          </h3>

          <h3>Address: {item.Address}</h3>
        </div>
      ))}
    </div>
  );
}

export default App;