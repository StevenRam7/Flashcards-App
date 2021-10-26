import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../utils/api";
import CardForm from "./CardForms/CardForm";

function EditCard() {
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});
  const [buttonText1, setButtonText1] = useState("Cancel");
  const [buttonText2, setButtonText2] = useState("Submit");
  const { deckId, cardId } = useParams();
  const history = useHistory();

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
        <CardForm submitHandler={submitHandler} doneHandler={cancelHandler} deck={deck} buttonText1={buttonText1} buttonText2={buttonText2} card={card} changeHandler={changeHandler}/>
      </div>
    </div>
  );
}

export default EditCard;
