import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, deleteCard, deleteDeck } from "../utils/api";

function View() {
  const [deck, setDeck] = useState({});
  const [cardID, setCardID] = useState("");
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    if (!deckId) return;
    readDeck(deckId, abortController.signal).then((data) => setDeck(data));
  }, [deckId]);

  const deleteDeck = async (deckID) => {
    setDeck(deckID)
  if(window.confirm("Are you sure you want to delete this deck?")){
      await deleteDeck(deckID);
      history.go(0);
    }
}

const deleteCard = async (cardId) => {
  setCardID(cardId)
if(window.confirm("Are you sure you want to delete this card?")){
    await deleteCard(cardID);
    //history.go(0);
  }
}

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
      <div class="card w-75">
    <div class="card-body">
      <h5 class="card-title">{deck.name}</h5>
      <p class="card-text">{deck.description}</p>
      <div className="button-row">
      <Link class="btn btn-secondary" to={`/decks/${deck.id}`}><span class="oi oi-eye">View</span></Link>
      <button class="btn btn-primary"><span class="oi oi-book">Study</span></button>
      <button class="btn btn-danger" onClick={() => deleteDeck(deck.id)}><span class="oi oi-trash"></span></button>
      </div>
    </div>
  </div>
      <h2>Cards</h2>
      {deck.cards?.map((card) => {
        return (
          <div>
           
            {/* cards with deck info - add deleteHandler for cards*/}
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
                    <button class="btn btn-danger" onClick={() => deleteCard(card.id)}><span class="oi oi-trash"></span></button>
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
