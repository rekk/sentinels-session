import React from 'react';
import { useState } from 'react';
import Header from './Header';
import './App.css';

function App() {
  const [playerAmount, setPlayerAmount] = useState(4)

  function handlePlayerAmount(e: any) {
    const newAmount = e.target.value
    setPlayerAmount(newAmount)
  }
  return (
    <>
      <Header />
      <div className="settings">
        <input type="range" min="1" max="8" value={playerAmount} onChange={handlePlayerAmount}/>
      </div>
      <CardContainer cardAmount={playerAmount}/>
    </>
  );
}

type CardContainerProps = {
  cardAmount: number
}

function CardContainer({cardAmount}: CardContainerProps) {
  var nums = listOfRandInts(cardAmount, 0, 25)
  return (
  <div className="cardContainer">
    { arr(cardAmount).map((n: any, i: any) => <Card key={i}/>) }
  </div>
  )
}

type CardProps = {
  
}

function Card() {
  return (
    <div className="card">
      <div>Card</div>
    </div>
  )
}

const listOfRandInts = (length: number, min: number, max: number) => {
  var result: number[] = []
  while (result.length < length) {
    const tmp = randInt(min, max)
    if (!result.includes(tmp))
      result.push(tmp)
  }
  return result
}

const randInt = (min: number, max: number) => {
  return Math.round(Math.random() * (max - min) + min)
}

// Create array of length n
const arr = (n: number) => {
  return Array(parseInt(n + '')).fill(0)
}

export default App;
