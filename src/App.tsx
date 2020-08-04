import React from 'react';
import { useState } from 'react';
import './App.scss';

import CardFile     from './data/db/cards.json';

function App() {
  const [playerAmount, setPlayerAmount] = useState(4)
  const villainAmount = 1
  const envAmount = 1

  const cards = CardFile
  const heroes = cards.filter((card: Card) => card.group == "hero")
  const villains = cards.filter((card: Card) => card.group == "villain")
  const envs = cards.filter((card: Card) => card.group == "env")

  console.log(CardFile)
  function handlePlayerAmount(e: React.MouseEvent<HTMLButtonElement>) { 
    const newAmount = e.currentTarget.innerHTML
    setPlayerAmount(parseInt(newAmount))
  }
  return (
    <div id="app">
      <PageTitle text="Sentinels Session Creator" />
      <div id="content">
        <div id="cards">
          <Title text="Cards" />
          <SubTitle text="Heroes" />
          <CardContainer id="heroCardContainer"    amount={playerAmount}   cardList={heroes}/>
          <Title text="Cards" />
          <SubTitle text="Villain" />
          <CardContainer id="villainCardContainer" amount={villainAmount}  cardList={villains}/>
          <Title text="Cards" />
          <SubTitle text="Environment" />
          <CardContainer id="envCardContainer"     amount={envAmount}      cardList={envs}/>
        </div>
        <div id="settings">
          <Title    text="Settings" />
          <SubTitle text="Player amount" />
          <div id="amount">
            <PlayerAmountButton val="2" handler={handlePlayerAmount} />
            <PlayerAmountButton val="3" handler={handlePlayerAmount} />
            <PlayerAmountButton val="4" handler={handlePlayerAmount} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Components
type PageTitle = {
  text: string;
}

function PageTitle({text}: PageTitle) {
  return (
    <a href="/">
      <div className="pageTitle">
        {text}
      </div>
    </a>
  )
}

type Title = {
  text: string;
}

function Title({text}: Title) {
  return (
    <div className="title">
      {text}
    </div>
  )
}

type SubTitle = {
  text: string;
}

function SubTitle({text}: SubTitle) {
  return (
    <div className="subtitle">
      {text}
    </div>
  )
}

type PlayerAmountButton = {
  val: string,
  handler(e: React.MouseEvent<HTMLButtonElement>): void;
}

function PlayerAmountButton({val, handler}: PlayerAmountButton) {
  return (
  <button className="button" onClick={handler}>
    {val}
  </button>
  )
}

type CardContainer = {
  amount: number,
  id: string,
  cardList: Card[]
}

function CardContainer({id, amount, cardList}: CardContainer) {
  const nums = listOfRandInts(amount, 0, cardList.length - 1)
  return (
  <div className="cardContainer">
    <div id={id} className="cardContainerGrid">
      { nums.map((n: number) => <Card key={n} group={cardList[n].group} name={cardList[n].name} hp={cardList[n].hp} img={process.env.PUBLIC_URL + "/" + cardList[n].img} />) }
    </div>
  </div>
  )
}

type Card = {
  group: string,
  name: string,
  hp: number,
  img: string
}

function Card({group, name, hp, img}: Card) {
  return (
    <div className="card">
      <div className="cardName">{name}</div>
      <img src={img} alt="cardImage" />
    </div>
  )
}

// Helper functions
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
// const arr = (n: number) => {
//   return Array(parseInt(n + '')).fill(0)
// }

export default App;
