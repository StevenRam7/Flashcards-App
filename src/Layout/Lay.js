import React, { useEffect } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { useState } from "react";
import ListDecks from "./ListDecks";
//this file is "./src/Layout/index.js" in Qualified



function Layout() {

  return (
    <div>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <button type="button" class="btn btn-secondary"><span class="oi oi-plus">Create Deck</span></button>
        <ListDecks />
        <NotFound />
      </div>
    </div>
  );
}

export default Layout;
