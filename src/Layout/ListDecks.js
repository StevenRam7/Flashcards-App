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
      <p class="card-text">{deck.description}</p>
      <div className="button-row">
      <button class="btn btn-secondary"><span class="oi oi-eye">View</span></button>
      <button class="btn btn-primary"><span class="oi oi-book">Study</span></button>
      <button class="btn btn-danger"><span class="oi oi-trash"></span></button>
      </div>
    </div>
  </div>
  )})}
    </div>
  )
    
      
}

export default ListDecks;
