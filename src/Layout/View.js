import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";

function View() {
  const [deck, setDeck] = useState({});
  const { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    if (!deckId) return;
    readDeck(deckId, abortController.signal).then((data) => setDeck(data));
  }, [deckId]);

  console.log(deck, deckId);

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
      {deck.cards?.map((card) => {
        return (
          <div>
            {/* cards with deck info - add deleteHandler and display the appropriate text*/}
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
                      class="btn btn-primary"
                    >
                      Edit
                    </Link>
                    <button class="btn btn-danger"><span class="oi oi-trash"></span></button>
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
