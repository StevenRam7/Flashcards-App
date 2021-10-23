import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../utils/api";

function EditCard() {
    const [deck, setDeck] = useState({});
  const { deckId } = useParams();
  const history = useHistory();
  function loadDeck() {
    readDeck(deckId).then(setDeck);
  };

  useEffect(() => {
    const abortController = new AbortController();
    if (!deckId) return;
    readDeck(deckId, abortController.signal)
    .then((data) => setDeck(data));
    return () => {
      console.log("Cleanup EditCard!");
      abortController.abort();
  }
  }, [deckId]);

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
    </div>
    </div>
  )
}

export default EditCard;