import React from "react";
import { useState, useEffect } from "react";
import { listDecks, deleteDeck } from "../utils/api";
import { useHistory, Link } from "react-router-dom";

function ListDecks({ decks }) {
  //const [decks, setDecks] = useState([]);
  const [deckID, setDeckID] = useState("");
  const history = useHistory();

  //useEffect(() => {
  //  listDecks().then((data) => setDecks(data));
  //}, []);

  const deleteHandler = async (deckID) => {
      setDeckID(deckID)
    if(window.confirm("Are you sure you want to delete this deck?")){
        await deleteDeck(deckID);
        history.go(0);
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
      <Link class="btn btn-secondary" to={`/decks/${deck.id}`}><span class="oi oi-eye">View</span></Link>
      <button class="btn btn-primary"><span class="oi oi-book">Study</span></button>
      <button class="btn btn-danger" onClick={() => deleteHandler(deck.id)}><span class="oi oi-trash"></span></button>
      </div>
    </div>
  </div>
  )})}
    </div>
  )
    
      
}

export default ListDecks;
