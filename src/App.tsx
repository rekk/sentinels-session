import React from 'react';
import { useState } from 'react';
import './App.scss';
import HeroFile     from './data/heroes.json';
import VillainFile  from './data/heroes.json';
import EnvFile      from './data/heroes.json';
import CardImg      from './data/cards/absolute_zero.png';

function App() {
  const [playerAmount, setPlayerAmount] = useState(4)
  const villainAmount = 1
  const envAmount = 1
  const heroes = HeroFile.cards
  const villains = VillainFile.cards
  const envs = EnvFile.cards

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
      { nums.map((n: number) => <Card key={n} name={cardList[n].name} img={CardImg} />) }
    </div>
  </div>
  )
}

type Card = {
  name: string,
  img: string
}

function Card({name, img}: Card) {
  return (
    <div className="card">
      <img src={img} alt="cardImage" />
      <div className="cardName">{name}</div>
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
