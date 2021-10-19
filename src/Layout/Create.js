import React, { useEffect, useState } from "react";
import { createDeck } from "../utils/api";
import { Link, useParams } from "react-router-dom";

function Create() {
    //404 error on this page
    return(
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
    )
}

export default Create;