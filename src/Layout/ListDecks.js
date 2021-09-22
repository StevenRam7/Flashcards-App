import React from "react";
import { useState, useEffect } from "react";
import { listDecks, deleteDeck } from "../utils/api";
import { useHistory } from "react-router-dom"

function ListDecks() {
  const [decks, setDecks] = useState([]);
  const [deckID, setDeckID] = useState("");
  const history = useHistory();

  useEffect(() => {
    listDecks().then((data) => setDecks(data));
  }, []);

  const deleteHandler = async () => {
      console.log(deckID)
    if(window.confirm("Are you sure you want to delete this deck?")){
        await deleteDeck(deckID);
        //history.go(0);
        //resolve api issue and fix delete handler
    }
  }

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
