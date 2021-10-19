import React, { useEffect, useState } from "react";
import { readDeck } from "../utils/api";
import { Link, useParams } from "react-router-dom";

function Study({ decks }) {
  const [deck, setDeck] = useState({});
  const [cardNumber, setCardNumber] = useState("");
  const { deckId } = useParams();
  function loadDeck() {
    readDeck(deckId).then(setDeck);
  }
  //const cardAmount = deck.cards.length;
  const cards = deck.cards;

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

console.log(deck.cards, cards)

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
        
      {/*<div>      ~"cards" comes up as undefined~
          {cards.map((card) => {
              return(
                  
        setCardNumber(card.id),
    <div>
    <h5 class="card-title">Card {cardNumber} of {card.length} </h5>
    <p class="card-text">Placeholder</p>
    <button class="btn btn-primary">Flip</button>
      </div>
          )})}
              </div>*/}
              </div>
    
  )
}

export default Study;
