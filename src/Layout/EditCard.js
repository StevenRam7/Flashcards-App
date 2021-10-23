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
  };

  function submitHandler(event) {

  }

  function cancelHandler() {
      
  }

  useEffect(() => {
    const abortController = new AbortController();
    if (!deckId) return
    readDeck(deckId, abortController.signal)
    .then((data) => setDeck(data));
    return () => {
      console.log("Cleanup EditCard!");
      abortController.abort();
  }
  }, [deckId]);

  useEffect(() => {
    const abortController = new AbortController();
     readCard(cardId, abortController.signal)
    .then((data) => setCard(data));
    return () => {
      console.log("Cleanup EditCard!");
      abortController.abort();
  }
  }, [cardId]);

  console.log(card);

  return(
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
            <textarea id="front" type="text" name="front" value={card.front} />
            </label>
          
          <br />
          <label>
            Back
            <br />
            <textarea
              id="back"
              type="text"
              name="back"
              value={card.back}
            />
          </label>
          <div class="buttons">
            <button type="button" onClick={() => cancelHandler()}>Cancel</button>
            <button type="submit">Submit</button>
          </div>
          </form>
    </div>
    </div>
  )
}

export default EditCard;