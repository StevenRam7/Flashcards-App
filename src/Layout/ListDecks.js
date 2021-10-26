import React from "react";
import { useState } from "react";
import { deleteDeck } from "../utils/api";
import { useHistory, Link } from "react-router-dom";

function ListDecks({ decks }) {
  const [deckID, setDeckID] = useState("");
  const history = useHistory();

  const deleteHandler = async (deckID) => {
    setDeckID(deckID);
    if (window.confirm("Are you sure you want to delete this deck?")) {
      await deleteDeck(deckID);
      history.go(0);
    }
  };

  return (
    <div>
      <Link class="btn btn-secondary" to="/decks/new">
        <span class="oi oi-plus">Create Deck</span>
      </Link>
      <div className="deck">
        {decks.map((deck) => {
          return (
            <div class="card w-75">
              <div class="card-body">
                <div className="d-flex w-100 justify-content-between">
                  <h5 class="card-title">{deck.name}</h5>
                  <small>{deck.cards.length} {deck.cards.length === 1 ? "card" : "cards"}</small>
                </div>
                <p class="card-text">{deck.description}</p>
                <div className="button-row">
                  <Link class="btn btn-secondary" to={`/decks/${deck.id}/edit`}>
                    <span class="oi oi-pencil">Edit</span>
                  </Link>
                  <Link class="btn btn-info" to={`/decks/${deck.id}`}>
                    <span class="oi oi-eye">View</span>
                  </Link>
                  <Link class="btn btn-primary" to={`/decks/${deck.id}/study`}>
                    <span class="oi oi-book">Study</span>
                  </Link>
                  <button
                    class="btn btn-danger"
                    onClick={() => deleteHandler(deck.id)}
                  >
                    <span class="oi oi-trash"></span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ListDecks;
