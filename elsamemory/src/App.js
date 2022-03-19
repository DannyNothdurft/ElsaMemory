import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  { "src": "/img/motiv1.png", matched: false },
  { "src": "/img/motiv2.png", matched: false },
  { "src": "/img/motiv3.png", matched: false },
  { "src": "/img/motiv4.png", matched: false },
  { "src": "/img/motiv5.png", matched: false },
  { "src": "/img/motiv6.png", matched: false },
  { "src": "/img/motiv7.png", matched: false },
  { "src": "/img/motiv8.png", matched: false },
  { "src": "/img/motiv9.png", matched: false },
  { "src": "/img/motiv10.png", matched: false },
  { "src": "/img/motiv11.png", matched: false },
  { "src": "/img/motiv12.png", matched: false },
]

function App() {
  const [card, setCard] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setchoiceOne] = useState(null);
  const [choiceTwo, setchoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);


  // shuffle cards
  const shuffleCard = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setchoiceOne(null)
    setchoiceTwo(null)
    setCard(shuffledCards)
    setTurns(0)
  }

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setchoiceTwo(card) : setchoiceOne(card)
  }

  // compre 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)

      if (choiceOne.src === choiceTwo.src) {
        setCard(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  // reset choices & increase turn
  const resetTurn = () => {
    setchoiceOne(null)
    setchoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  // start a new game automatical
  useEffect(() => {
    shuffleCard()
  }, [])

  return (
    <div className="App">
      <h1>Magic Memory</h1>
      <button onClick={shuffleCard}>New Game</button>

      <div className='card-grid' >
        {card.map(card => (
          <SingleCard
            handleChoice={handleChoice}
            key={card.id}
            card={card}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;