import "../styles/MemoryGame.css";
import shuffle from "../shuffle";
import { useState, useRef, useEffect } from "react";



const items = ["🥶","🤡","😂","😈","🤖","🤢"];
const allitems = shuffle([...items, ...items]);
const defaultState = { index: null, value: null };

function MemoryGame() {
  
  const [FirstCard, setFirstCard] = useState(defaultState);
  const [SecondCard, setSecondCard] = useState(defaultState);
  const [Remainingcards, setRemainingCards] = useState(allitems);
  const [deck, setDeck] = useState(() => shuffle([...items, ...items]));
  const [gameStarted, setGameStarted] = useState(true);

  

  const [Moves, setMoves] = useState(0);
  const timer = useRef();
  
 const resetGame = () => {
  const newDeck = shuffle([...items, ...items]);
  setGameStarted(false); 
  setDeck(newDeck);
  setRemainingCards(newDeck);
  setFirstCard(defaultState);
  setSecondCard(defaultState);
  setMoves(0);
  clearTimeout(timer.current);

  
  setTimeout(() => {
    setGameStarted(true); 
  }, 300); 
};




  const handleClick = (index, value) => {
    if (FirstCard.index !== null && SecondCard.index !== null) return;

    if (FirstCard.index === null) {
      setFirstCard({ index, value });
    } else if (index !== FirstCard.index && SecondCard.index === null) {
      setSecondCard({ index, value });
      
    }
  };

  useEffect(() => {
    if (FirstCard.index !== null && SecondCard.index !== null) {
      setMoves((x)=>x+1);
      if (FirstCard.value === SecondCard.value) {
        setRemainingCards((prev) =>
          prev.filter((card) => card !== FirstCard.value)
        );
        resetCards();
      } else {
        timer.current = setTimeout(() => {
          resetCards();
        }, 1000);
      }
    }
  
  

    return () => clearTimeout(timer.current);
  }, [FirstCard, SecondCard]);




  const resetCards = () => {
    setFirstCard(defaultState);
    setSecondCard(defaultState);
  };

  return (
    

    <div className="container">
      {!gameStarted && <div className="blackout-overlay"></div>}

      <div className="CardsContainer">
        
        {deck.map((item, index) => (
          <div
            key={index}
            className={`card ${
  gameStarted && (
    FirstCard.index === index ||
    SecondCard.index === index ||
    !Remainingcards.includes(item)
  )
    ? "flipped"
    : ""
}`}

            onClick={() => handleClick(index, item)}
          >
            <div className="front"></div>
            <div className="back">{item}</div>
          </div>
        ))}
        
      </div>
             

    <div>{(Remainingcards.length===0)?(
      <>
      <p>victory</p>
    <button  className="Play-btn"onClick={resetGame}>Play Again</button>
    </>)
    :<p>moves:{Moves}</p>}</div>
    </div>
  );
}

export default MemoryGame;
