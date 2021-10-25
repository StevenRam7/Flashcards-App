import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../utils/api";

function EditCard() {
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});
  const { deckId, cardId } = useParams();
  const history = useHistory();
  function loadDeck() {
    readDeck(deckId).then(setDeck);
  }

  function changeHandler({ target: { name, value } }) {
    setCard(() => ({
      [name]: value,
    }));
  }

  function submitHandler(event) {
    event.preventDefault();
    const abortController = new AbortController();
    updateCard(
      {
        front: event.target.cardfront.value,
        back: event.target.cardback.value,
        deckId: parseInt(deckId),
        id: cardId,
      },
      abortController.signal
    ).then((data) => history.push(`/decks/${deckId}`));
  }

  function cancelHandler() {
    history.push(`/decks/${deckId}`);
  }

  useEffect(() => {
    const abortController = new AbortController();
    if (!deckId) return;
    readDeck(deckId, abortController.signal).then((data) => setDeck(data));
    return () => {
      console.log("Cleanup EditCard!");
      abortController.abort();
    };
  }, [deckId]);

  useEffect(() => {
    const abortController = new AbortController();
    readCard(cardId, abortController.signal).then((data) => setCard(data));
    return () => {
      console.log("Cleanup EditCard!");
      abortController.abort();
    };
  }, [cardId]);

  console.log(card);

  return (
    <div class="editcard-screen">
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
              Edit Card
            </li>
          </ol>
        </nav>
      </div>
      <div class="forms">
        <h1>Edit Card</h1>
        <form onSubmit={(e) => submitHandler(e)}>
          <label>
            Front
            <br />
            <textarea
              id="cardfront"
              type="text"
              name="cardfront"
              placeholder="Front side of card"
              value={card.front}
              onChange={changeHandler}
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
              value={card.back}
              onChange={changeHandler}
            />
          </label>
          <div class="buttons">
            <button type="button" onClick={() => cancelHandler()}>
              Cancel
            </button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCard;
