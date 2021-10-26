import React from "react";

function CardForm({ submitHandler, doneHandler, deck, buttonText1, buttonText2, card={}, changeHandler }) {


    return(
        
        <form onSubmit={(e) => submitHandler(e)}>
          <label>
            Front
            <br />
            <textarea
              id="cardfront"
              type="text"
              name="cardfront"
              placeholder="Front side of card"
              value={card.front}
              onChange={changeHandler}
            />
          </label>

          <br />
          <label>
            Back
            <br />
            <textarea
              id="cardback"
              type="text"
              name="cardback"
              placeholder="Back side of card"
              value={card.back}
              onChange={changeHandler}
            />
          </label>
          <div class="buttons">
            <button type="button" onClick={() => doneHandler()}>
              {buttonText1}
            </button>
            <button type="submit">{buttonText2}</button>
          </div>
        </form>
     
    )
}

export default CardForm;