import React, { useEffect } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { useState } from "react";
import ListDecks from "./ListDecks";
import View from "./View";
import { Switch, Route } from "react-router-dom";
import { listDecks } from "../utils/api";
//this file is "./src/Layout/index.js" in Qualified



function Layout() {

  const [decks, setDecks] = useState([]);

  useEffect(() => {
    listDecks()
    .then((data) => setDecks(data));
  }, []);

//GET "VIEW" TO RENDER PROPERLY
console.log(decks);
  return (
    <div>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <button type="button" class="btn btn-secondary"><span class="oi oi-plus">Create Deck</span></button>
        <Switch>
          <Route path="/" component={() => <ListDecks decks={decks} />} />
          <Route path="/decks/:deckid" component={() => <View decks={decks} />} />
          
        <NotFound />
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
