import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api";
import { createCard } from "../utils/api";

function AddCard() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const history = useHistory();

  function doneHandler(event) {
    history.push(`/decks/${deckId}`);
  }

  function submitHandler(event) {
    event.preventDefault();
    const abortController = new AbortController();
    console.log(event.target.cardfront.value);
    createCard(deckId, {
        front: event.target.cardfront.value,
        back: event.target.cardback.value,
        deckId: deckId,
      },
      abortController.signal).then((data) => history.push(`/decks/${deckId}`));
    
  }

  useEffect(() => {
    const abortController = new AbortController();
    if (!deckId) return;
    readDeck(deckId, abortController.signal).then((data) => setDeck(data));
    return () => {
      console.log("Cleanup AddCard!");
      abortController.abort();
    };
  }, [deckId]);

  return (
    <div class="add-card-screen">
      {/*breadcrumb bar for navigation*/}
      <div class="nav-bar">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Add Card
            </li>
          </ol>
        </nav>
      </div>
      <div class="forms">
        <h1>{deck.name}: Add Card</h1>
        <form onSubmit={(e) => submitHandler(e)}>
          <label>
            Front
            <br />
            <textarea
              id="cardfront"
              type="text"
              name="cardfront"
              placeholder="Front side of card"
            />
          </label>

          <br />
          <label>
            Back
            <br />
            <textarea
              id="cardback"
              type="text"
              name="cardback"
              placeholder="Back side of card"
            />
          </label>
          <div class="buttons">
            <button type="button" onClick={() => doneHandler()}>
              Done
            </button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCard;
