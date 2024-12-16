import React from 'react';
import './App.css';
import { TimetellerCard } from './Components/TimetellerCard/TimetellerCard.component';
import Clock from './Components/AnalogHandsUsingNumbers/AnalogHandsUsingNumbers.component';

const timeTellers = [
  {
    name: "TimeTeller 1",
    description: "TimeTeller 1 description",
    children: <Clock />
  },
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

