import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api";
import { createCard } from "../utils/api";

function AddCard() {
    const { deckId } = useParams();
    const [deck, setDeck] = useState({});
    const [card, setCard] = useState({});
    const history = useHistory();
    

    function doneHandler(event) {
        history.push(`/decks/${deckId}`)
    };
    
    function submitHandler(event) {
        event.preventDefault();
        const abortController = new AbortController();
        setCard({ front: event.target.cardfront.value, back: event.target.cardback.value });
        console.log(event.target.cardfront.value);
        createCard(deckId, card, abortController.signal)
       .then((data) => history.push(`/decks/${deckId}`))
       //cards are created without front/back text
    }

    useEffect(() => {
        const abortController = new AbortController();
        if (!deckId) return;
        readDeck(deckId, abortController.signal)
        .then((data) => setDeck(data));
        return () => {
          console.log("Cleanup AddCard!");
          abortController.abort();
      }
      }, [deckId]);

      console.log(card)

    return(
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
              Add Cards
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
            <textarea id="front" type="text" name="cardfront" placeholder="Front side of card" />
            </label>
          
          <br />
          <label>
            Back
            <br />
            <textarea
              id="back"
              type="text"
              name="cardback"
              placeholder="Back side of card"
            />
          </label>
          <div class="buttons">
            <button type="button" onClick={() => doneHandler()}>Done</button>
            <button type="submit">Save</button>
          </div>
          </form>
          
      </div>
        </div>
    )
}

export default AddCard;