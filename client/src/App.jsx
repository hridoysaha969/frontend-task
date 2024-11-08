import "./App.css";
import Card from "./components/Card";
import { CARD_DATA } from "./lib/clientData";

function App() {
  const cards = CARD_DATA;

  return (
    <main className="main">
      {cards.map((card, ind) => (
        <Card key={ind} data={card} />
      ))}
    </main>
  );
}

export default App;
