import React from "react";
import { useState, useEffect } from "react";
import { listDecks } from "../utils/api";

function ListDecks() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    listDecks().then((data) => setDecks(data));
  }, []);

  return (
      <div className="deck">
      {decks.map((deck) => {
return (
    <div class="card w-75">
    <div class="card-body">
      <h5 class="card-title">{deck.name}</h5>
      <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
      <a href="#" class="btn btn-primary">Button</a>
    </div>
  </div>
  )})}
    </div>
  )
    
      
}

export default ListDecks;
