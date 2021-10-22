import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api";
import { createCard } from "../utils/api";

function AddCard() {
    const { deckId } = useParams();
    const [deck, setDeck] = useState({});
    const history = useHistory();
    

    function doneHandler(event) {
        history.push(`/decks/${deckId}`)
    };
    //done button works, save button is non-responsive
    function submitHandler(event) {
        event.preventDefault();
        console.log(event);
       createCard(deckId, { front: event.target.front.value, back: event.target.back.value });
    };

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

    return(
        <div class="add-card-screen">
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
          <form onSubmit={() => submitHandler(), console.log("Save")}>
          <label>
            Name
            <br />
            <textarea id="front" type="text" name="front" placeholder="Front side of card" />
            </label>
          
          <br />
          <label>
            Description
            <br />
            <textarea
              id="back"
              type="text"
              name="back"
              placeholder="Back side of card"
            />
          </label>
          </form>
          <div class="buttons">
            <button type="button" onClick={() => doneHandler()}>Done</button>
            <button type="submit">Save</button>
          </div>
      </div>
        </div>
    )
}

export default AddCard;