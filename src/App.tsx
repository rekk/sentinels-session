import React from 'react';
import { useState } from 'react';
import Header from './Header';
import HeroFile from './data/Heroes.json';
import './App.css';

function App() {
  const [hero, setHero] = useState({"name": ""})
  const heroList: any = HeroFile.map(h => 
            { return {
              "name":       h.name,
              "difficulty": h.difficulty,
              "nemesis":    h.nemesis}
            })
  const onHeroGen = () => {
    const h = drawCard(heroList)
    setHero(h)
  }
  return (
    <>
      <Header />
      <HeroButton callback={onHeroGen}/>
      <Hero hero={hero} />
    </>
  );
}

function Hero({hero}: any) {
  return (
  <div className="hero">
     <div className="heroName">{hero.name}</div>
     <img src={`${process.env.PUBLIC_URL}/${upper(hero.name)}.PNG`} alt=""/>
  </div>
  )
}

function HeroButton({callback}: any) {
  return (
    <div>
      <input onClick={callback} type="button" className="generatorButton" value="Random hero"/>
    </div>
  ) 
}

const drawCard = (cardList: any) => {
  const i = randInt(0, cardList.length - 1)
  console.log(i)
  const card = cardList[i]
  console.log(card)
  return card
}

const randInt = (min: number, max: number) => {
  return Math.round(Math.random() * (max - min) + min)
}

const upper = (s: string) => {
  return s.replace(" ", "-").toUpperCase()
}


export default App;
