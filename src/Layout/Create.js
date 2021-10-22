import React, { useEffect, useState } from "react";
import { createDeck } from "../utils/api";
import { Link, useParams, useHistory } from "react-router-dom";

function Create() {
  const history = useHistory();

  function cancelHandler() {
    history.push("/");
  }

  function submitHandler(event) {
    event.preventDefault();
    createDeck({ description: event.target.description.value, name: event.target.deckname.value })
    .then((data) => history.push(`/decks/${data.id}`))
  }

  return (
    <div class="create-screen">
      <div class="nav-bar">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Create Deck
            </li>
          </ol>
        </nav>
      </div>
      <div class="forms">
        <form onSubmit={(e) => submitHandler(e)}>
          <label htmlFor="name">
            Name
            <br />
            <input id="name" type="text" name="deckname" placeholder="Deck name" />
          </label>
          <br />
          <label htmlFor="description">
            Description
            <br />
            <textarea
              id="name"
              type="text"
              name="description"
              placeholder="Brief description of the deck."
            />
          </label>

          <div class="buttons">
            <button type="button" onClick={() => cancelHandler()}>Cancel</button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Create;
