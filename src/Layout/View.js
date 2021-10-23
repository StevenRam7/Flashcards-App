import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, deleteCard, deleteDeck } from "../utils/api";

function View() {
  const [deck, setDeck] = useState({});
  const [markDelete, setMarkDelete] = useState("N");
  const { deckId } = useParams();
  const history = useHistory();
  function loadDeck() {
    readDeck(deckId).then(setDeck);
  };

  useEffect(() => {
    const abortController = new AbortController();
    if (!deckId && markDelete === "N") return
    readDeck(deckId, abortController.signal)
    //crashes after deleting deck because of readDeck
    .then((data) => setDeck(data));
    return () => {
      console.log("Cleanup view!");
      abortController.abort();
  }
  }, [deckId]);

  async function deckDeleter(deckID) {
    try{
      setDeck(deckID)
  if(window.confirm("Are you sure you want to delete this deck?")){
      await deleteDeck(deckID);
      history.go("/");
    }
    }
     catch(error) {
      return (error)
    }
    setMarkDelete("Y");
}

function cardDeleter(cardId) {
  const confirmed = window.confirm(
    "Delete this card?\n\nYou will not be able to recover it."
  );
  if (confirmed) {
    console.log("Card Deleted", confirmed, cardId);
    deleteCard(cardId)
    loadDeck();
  }
}
console.log(markDelete)

  return (
    <div className="deck-cards">
      {/*breadcrumb bar for navigation*/}
      <div class="nav-bar">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              {deck.name}
            </li>
          </ol>
        </nav>
      </div> 
      <div class="card w-75">
    <div class="card-body">
      <h5 class="card-title">{deck.name}</h5>
      <p class="card-text">{deck.description}</p>
      <div className="button-row">
      <Link class="btn btn-secondary" to={`/decks/${deck.id}`}>Edit</Link>
      
        <Link class="btn btn-primary" to={`/decks/${deck.id}/study`}><span class="oi oi-book">Study</span></Link>
      
      
      <button class="btn btn-danger" onClick={() => deckDeleter(deck.id)}><span class="oi oi-trash"></span></button>
      </div>
    </div>
  </div>
      <h2>Cards</h2>
      {deck.cards?.map((card) => {
        return (
          <div>
           
            {/* cards with deck info*/}
            <div class="row">
              <div class="col-sm-6">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">{card.name}</h5>
                    <p class="card-text">{card.front}</p>
                    
                  </div>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="card">
                  <div class="card-body">
                    <p class="card-text">{card.back}</p>
                    <Link
                      to={`/decks/${deckId}/cards/${card.id}/edit`}
                      class="btn btn-secondary"
                    >
                      Edit
                    </Link>
                    <button class="btn btn-danger" onClick={() => cardDeleter(card.id)}><span class="oi oi-trash"></span></button>
                    {/*doesn't reload page upon deleting card*/}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default View;
