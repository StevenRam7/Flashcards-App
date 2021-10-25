import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";

function EditDeck() {
  const [deck, setDeck] = useState({});
  const { deckId } = useParams();
  const history = useHistory();

  function submitHandler(event) {
    event.preventDefault();
    const abortController = new AbortController();
    updateDeck(
      {
        name: event.target.name.value,
        description: event.target.description.value,
        id: deckId
    },
      abortController.signal
    ).then((data) => history.push(`/decks/${data.id}`));
  }

  function cancelHandler() {
    history.push(`/decks/${deckId}`);
  }

  function changeHandler({ target: { name, value } }) {
    setDeck(() => ({
      [name]: value,
    }));
  }

  useEffect(() => {
    const abortController = new AbortController();
    if (!deckId) return;
    readDeck(deckId, abortController.signal).then((data) => setDeck(data));
    return () => {
      console.log("Cleanup EditDeck!");
      abortController.abort();
    };
  }, [deckId]);

  console.log(deckId)

  return (
    <div class="editdeck-screen">
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
              Edit Deck
            </li>
          </ol>
        </nav>
      </div>
      <div class="forms">
        <h1>Edit Deck</h1>
        <form onSubmit={(e) => submitHandler(e)}>
          <label>
            Name
            <br />
            <textarea
              id="name"
              type="text"
              name="name"
              value={deck.name}
              onChange={changeHandler}
            />
          </label>

          <br />
          <label>
            Description
            <br />
            <textarea
              id="description"
              type="text"
              name="description"
              value={deck.description}
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

export default EditDeck;
