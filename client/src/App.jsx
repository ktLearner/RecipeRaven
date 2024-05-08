import { useState, useEffect } from "react";
import "./App.css";
import { Navbar } from "./Navbar";

const App = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/recipes");
      console.log("Response status:", response.status); // Log response status
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response is not JSON");
      }
      const responseData = await response.json();
      const data = responseData.foundRecipes; // Access foundRecipes property
      console.log("Fetched data:", data); // Log fetched data
      setPlayers(data);
      setLoading(false); // Set loading to false after successful fetch
    } catch (error) {
      console.error("Fetch error:", error); // Log fetch error
      setError(error.message || "Failed to fetch data");
      setLoading(false); // Set loading to false on error
    }
  };
  
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Check fetched data
  if (!players || players.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="list">
        {players.map((player, index) => (
          <div className="player" key={index}>
            <img src={player.image} className="image" alt={player.name} />
            <h2>{player.name}</h2>
            <p>{player.description}</p>
            <p>Rating: {player.ratings.rating}</p>
            <p>Calories: {player.calories}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
