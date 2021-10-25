import React, { useEffect } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { useState } from "react";
import ListDecks from "./ListDecks";
import View from "./View";
import { Switch, Route } from "react-router-dom";
import { listDecks } from "../utils/api";
import EditCard from "./EditCard";
import Study from "./Study";
import Create from "./Create";
import AddCard from "./AddCard";
import EditDeck from "./EditDeck";
//this file is "./src/Layout/index.js" in Qualified

function Layout() {

  const [decks, setDecks] = useState([]);

  useEffect(() => {
    listDecks()
    .then((data) => setDecks(data));
  }, []);

  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/" component={() => <ListDecks decks={decks} />} />
          <Route exact path="/decks/new" component={() => <Create />} />
          <Route exact path="/decks/:deckId" component={() => <View />} />
          <Route exact path="/decks/:deckId/study" component={() => <Study />} />
          <Route exact path="/decks/:deckId/edit" component={() => <EditDeck />} />
          <Route exact path="/decks/:deckId/cards/new" component={() => <AddCard />} />
          <Route exact path="/decks/:deckId/cards/:cardId/edit" component={() => <EditCard />} />
          
          
        <NotFound />
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
