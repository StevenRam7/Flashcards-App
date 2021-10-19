import React, { useEffect, useState } from "react";
import { readDeck } from "../utils/api";
import { Link } from "react-router-dom";

function Study({ decks }) {

    const [deck, setDeck] = useState({});
    //get name to display properly

    return(
        <div class="study-screen">
        
      <div className="nav-bar">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              {deck.name}
            </li>
          </ol>
        </nav>
      </div>

            
        </div>
    )
}

export default Study;