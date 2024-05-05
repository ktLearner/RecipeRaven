import { useState } from "react";
import "./app.css";
import { Navbar } from "./navbar";
const players = [
  {
    image:
     "https://www.cubesnjuliennes.com/wp-content/uploads/2020/07/Chicken-Biryani-Recipe.jpg",
    name: "Biryani",
    taste:"Spicy",
    origin: "Iranian",
    famous: "South asia",
  },
  {
    image:
      "https://cdn.cdnparenting.com/articles/2020/02/26144447/PULAV.jpg",
    name: "Pulav",
    taste: "medium spice",
    origin: "Persian",
    famous: "Asia",
  },
  {
    image:
     "https://www.cubesnjuliennes.com/wp-content/uploads/2020/07/Chicken-Biryani-Recipe.jpg",
    name: "Biryani",
    taste:"Spicy",
    origin: "Iranian",
    famous: "South asia",
  },
  {
    image:
     "https://www.cubesnjuliennes.com/wp-content/uploads/2020/07/Chicken-Biryani-Recipe.jpg",
    name: "Biryani",
    taste:"Spicy",
    origin: "Iranian",
    famous: "South asia",
  },
  {
    image:
      "https://cdn.cdnparenting.com/articles/2020/02/26144447/PULAV.jpg",
    name: "Pulav",
    taste: "medium spice",
    origin: "Persian",
    famous: "Asia",
  },
  {
    image:
      "https://cdn.cdnparenting.com/articles/2020/02/26144447/PULAV.jpg",
    name: "Pulav",
    taste: "medium spice",
    origin: "Persian",
    famous: "Asia",
  },
  {
    image:
      "https://cdn.cdnparenting.com/articles/2020/02/26144447/PULAV.jpg",
    name: "Pulav",
    taste: "medium spice",
    origin: "Persian",
    famous: "Asia",
  },

];
export const App = () => {
  const [name, setName] = useState("hello");
  return (
    <div>
      <Navbar></Navbar>
      <div className="list">
        {players.map((player, index) => (
          <div className="player" key={index}>
            <img src={player.image} className="image" />
            <div>{player.name}</div>
            <div>{player.taste}</div>
            <div>{player.origin}</div>
            <div>{player.famous}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
