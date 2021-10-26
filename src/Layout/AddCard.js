import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api";
import { createCard } from "../utils/api";
import CardForm from "./CardForms/CardForm";

function AddCard() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [buttonText1, setButtonText1] = useState("Done");
  const [buttonText2, setButtonText2] = useState("Save");
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
      <div>
        <h1>Add Card</h1>
        <CardForm submitHandler={submitHandler} doneHandler={doneHandler} deck={deck} buttonText1={buttonText1} buttonText2={buttonText2} />
      </div>
    </div>
  );
}

export default AddCard;
