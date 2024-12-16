import React from 'react';
import './App.css';
import { TimetellerCard } from './Components/TimetellerCard/TimetellerCard.component';
import Clock from './Components/AnalogHandsUsingNumbers/AnalogHandsUsingNumbers.component';
import { Casio } from './Components/CasioWatch/Casio/Casio.component';

const timeTellers = [
  {
    name: "Analog hands using numbers",
    description: "Analog clock with numbers as hands",
    children: <Clock />
  },
  {
    name: "Casio",
    description: "Casio digital watch",
    children: <Casio />
  }
];

function App() {
  return (
    <div className="App">
      {timeTellers.map((timeTeller) => (
        <TimetellerCard title={timeTeller.name} description={timeTeller.description} children={timeTeller.children} />
      ))}
    </div>
  );
}

export default App;

