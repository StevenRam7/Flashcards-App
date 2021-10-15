import React, { useEffect } from "react";
import ListDecks from "./ListDecks";
import { readDeck } from "../utils/api";

//use readDeck to load the deck info, add breadcrumb nav bar at top

function View ({ decks }) {
    return (
        <div className="deck-cards">
            {decks.map((deck) => {
               return (
                <div class="row">
                <div class="col-sm-6">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">Special title treatment</h5>
                      <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                      <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">Special title treatment</h5>
                      <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                      <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                  </div>
                </div>
              </div>
               )
            })}
        </div>
    )
    
}

export default View;