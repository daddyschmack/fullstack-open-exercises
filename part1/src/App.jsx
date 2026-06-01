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
  const [total, setTotal] = useState(0);

  const handleGoodClick = () => {
    setAll(allClick.concat('Good'));
    const updatedGood = good + 1;
    setGood(updatedGood);
    setTotal(updatedGood + neutral + bad);
  }
const handleNeutralClick = () => {
      setAll(allClick.concat('Neutral'));
      const updatedNeutral = neutral + 1;
      setNeutral(updatedNeutral);
      setTotal(good + updatedNeutral + bad);
}
const handleBadClick = () => {
      setAll(allClick.concat('Bad'));
      const updatedBad = bad + 1;
      setBad(updatedBad);
      setTotal(left + neutral + updatedBad);
}
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

   </div>
  )
}

export default App
