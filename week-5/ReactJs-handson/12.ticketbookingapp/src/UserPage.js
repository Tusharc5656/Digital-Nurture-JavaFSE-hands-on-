import FlightDetails from "./FlightDetails";

function UserPage() {
  return (
    <div>
      <h1>Welcome User</h1>

      <p>You can now book your tickets.</p>

      <button>Book Ticket</button>

      <br />
      <br />

      <FlightDetails />
    </div>
  );
}

export default UserPage;