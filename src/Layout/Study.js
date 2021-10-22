import React, { useEffect, useState } from "react";
import { readDeck } from "../utils/api";
import { Link, useParams, useHistory } from "react-router-dom";

function Study({ decks }) {
  const [deck, setDeck] = useState({});
  const [cardNumber, setCardNumber] = useState(0);
  const [currentView, setCurrentView] = useState("front");
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    if (!deckId) return;
    readDeck(deckId, abortController.signal).then((data) => setDeck(data));
    return () => {
      console.log("Cleanup study!");
      abortController.abort();
    };
  }, [deckId]);

  function flipHandler() {
    if (currentView === "front") {
      setCurrentView("back");
    }
    if (currentView === "back") {
      setCurrentView("front");
    }
  }

  function nextHandler() {
    setCardNumber(cardNumber + 1);
    setCurrentView("front");
    if (cardNumber + 1 === deck.cards.length) {
      if (
        window.confirm(
          "Restart cards?/n/Click 'cancel' to return to the homepage."
        )
      ) {
        setCardNumber(0);
      } else history.push("/");
    }
  }

  console.log(deck);

  if (deck.cards?.length > 2)
  //deck is undefined
    return (
      <div class="study-screen">
        {/*breadcrumb bar for navigation*/}
        <div className="nav-bar">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                <Link to={`/decks/${deckId}`}>{deck.name}</Link>
              </li>
              <li class="breadcrumb-item">Study</li>
            </ol>
          </nav>
          <h1>Study: {deck.name}</h1>
        </div>

        <div>
          {deck.cards?.filter((card, index) => index === cardNumber).map((card) => {
              return (
                <div>
                  <h5 class="card-title">
                    Card {cardNumber + 1} of {deck.cards.length}{" "}
                  </h5>
                  <p class="card-t">
                    {currentView === "front" ? card.front : card.back}
                  </p>
                  <button onClick={flipHandler} class="btn btn-primary">
                    Flip
                  </button>
                  {currentView === "back" && (
                    <button onClick={() => nextHandler()}>Next</button>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    ); else return(
        <div class="not-enough-screen">
        {/*breadcrumb bar for navigation*/}
        <div className="nav-bar">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
        <Link to="/">Home</Link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          <Link to={`/decks/${deckId}`}>{deck.name}</Link>
        </li>
        <li class="breadcrumb-item">Study</li>
      </ol>
    </nav>
    <h1>Study: {deck.name}</h1>
    <h3>Not enough cards.</h3>
    <p>You need at least 3 cards to study. There are {deck.cards?.length} cards in this deck.</p>
    <Link to={`/decks/${deckId}/cards/new`} class="btn btn-primary"><span class="oi oi-plus">Add Cards</span></Link>
  </div>
  </div>
    )
}

export default Study;
