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
const StatisticsLine = ({text, value}) => <tr>
    <td>{text}</td> <td>{value.toFixed(2)}</td></tr>

const Statistics = ({good = 0, bad = 0, neutral = 0}) => {
    const total = good + bad + neutral;
    const average = total > 0 ? (good + bad)/total : 0;
    const positive = total > 0 ? good/total : 0;
     if(total === 0) return <div>No feedback given</div>
    return (

        <div id="statistics">
            <h3>Statistics</h3>
            <table id="statistics-table">
                <tbody>
            <StatisticsLine text="Good" value={good} />
            <StatisticsLine text="Neutral" value={neutral} />
            <StatisticsLine text="Bad" value={bad} />
            <StatisticsLine text="All" value={total} />
            <StatisticsLine text="Average" value={average}/>
            <StatisticsLine text= "Positive" value={positive}/>
                </tbody>
            </table>

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
  const statProps = {good, neutral, bad};
  return (
   <div>

       <Button onClick={handleGoodClick} text="Good" />
       <Button onClick={handleNeutralClick} text="Neutral" />
       <Button onClick={handleBadClick} text="Bad" />


     <History allClicks={allClick} />
     <Statistics {...statProps} />
   </div>
  )
}

export default App