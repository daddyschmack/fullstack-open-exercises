import {useEffect, useState} from 'react'
import PersonsForm from './components/PersonsForm'
import axios from "axios";
import './App.css'

const Filter = ({filter, setFilter})=> {
    const handleSearch = (event) => {
        setFilter(event.target.value)
        }
        return(
                    <p>Filter Names by: <input value={filter} onChange={handleSearch}/></p>
            )

}

const Persons = (props) => {
    const personsToShow = props.persons.filter( person => person.name.toLowerCase().includes(props.filter.toLowerCase()))
    return (
        <ul className="personList">
            {personsToShow.map(person => <li key={person.id}>{person.name} {person.number}</li>)}
        </ul>
    )
}
const App = () => {
    let [persons, setPersons] = useState([]);
    const hook = () => {
        axios.get('http://localhost:3001/persons')
            .then((response) => {
                setPersons(response.data)
            })
    }

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(hook, [])
  const addPerson = (event) =>{
      event.preventDefault()
        let isDuplicate = persons.some( person => person.name === newName)
  if(isDuplicate){
          return alert(`${newName} is already added to phonebook`)
      }
      // We already have the current input value in the newName state!
      setPersons( persons.concat({name: newName, number: newNumber}))

      setNewName('');
      setNewNumber('');
  }



  return (
    <div>
        <Filter filter={filter} setFilter={setFilter}/>
      <h2>Phonebook</h2>
      <PersonsForm
          addPerson={addPerson}
          newName={newName}
          setNewName={setNewName}
          newNumber={newNumber}
          setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
        <Persons persons={persons} filter={filter}/>
    </div>
  )
}

export default App