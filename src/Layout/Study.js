import React, { useEffect, useState } from "react";
import { readDeck } from "../utils/api";
import { Link, useParams } from "react-router-dom";

function Study({ decks }) {
  const [deck, setDeck] = useState({});
  const { deckId } = useParams();
  function loadDeck() {
    readDeck(deckId).then(setDeck);
  }
  //loadDeck();

  useEffect(() => {
    const abortController = new AbortController();
    if (!deckId) return 
        readDeck(deckId, abortController.signal)
        .then((data) => setDeck(data));
    return () => {
        console.log("Cleanup study!");
        abortController.abort();
    }
}, [deckId]);

  return (
    <div class="study-screen">
        {/*breadcrumb bar for navigation*/}
      <div className="nav-bar">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            </li>
            <li class="breadcrumb-item">Study</li>
          </ol>
        </nav>
        <h1>Study: {deck.name}</h1>
      </div>
    </div>
  );
}

export default Study;
