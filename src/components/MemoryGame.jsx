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
  const [Moves, setMoves] = useState(0);
  const timer = useRef();

  const handleClick = (index, value) => {
    if (FirstCard.index !== null && SecondCard.index !== null) return;

    if (FirstCard.index === null) {
      setFirstCard({ index, value });
    } else if (index !== FirstCard.index && SecondCard.index === null) {
      setSecondCard({ index, value });
      setMoves((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (FirstCard.index !== null && SecondCard.index !== null) {
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
    <>
      <div className="CardsContainer">
        {allitems.map((item, index) => (
          <div
            key={index}
            className={`card ${
              FirstCard.index === index ||
              SecondCard.index === index ||
              !Remainingcards.includes(item)
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
    </>
  );
}

export default MemoryGame;
