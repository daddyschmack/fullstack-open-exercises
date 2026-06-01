import { useState } from 'react'
import './App.css'

const Display = ({counter}) =>  <div>{counter}</div>


const Button = ({onClick, text}) => <button onClick={onClick}> {text}</button>

const History = (props) => {
    if(props.allClicks.length === 0){
        return(
            <div>
                the app is used by pressing the buttons
            </div>
        )
    }
    return (
        <div>
            button press history: {props.allClicks.join(' ')}
        </div>
    )
}


const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [allClick, setAll] = useState([]);

  const handleGoodClick = () => {
    setAll(allClick.concat('Good'));
    setGood(good + 1);
  }
  const handleNeutralClick = () => {
      setAll(allClick.concat('Neutral'));
      setNeutral(neutral + 1);
  }
  const handleBadClick = () => {
      setAll(allClick.concat('Bad'));
      setBad(bad + 1);
  }

  const total = good + neutral + bad;
  const average = total === 0 ? 0 : (good - bad) / total;
  const positive = total === 0 ? 0 : (good / total) * 100;

  return (
   <div>

       <Button onClick={handleGoodClick} text="Good" />
       <Button onClick={handleNeutralClick} text="Neutral" />
       <Button onClick={handleBadClick} text="Bad" />


     <History allClicks={allClick} />
       <h3>Statistics</h3>
       <p>good: {good} </p>
       <p>neutral: {neutral} </p>
       <p>bad: {bad} </p>
       <p>all: {total}</p>
       <p>average: {average}</p>
       <p>positive: {positive} %</p>
   </div>
  )
}

export default App