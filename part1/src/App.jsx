import { useState } from 'react'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState(null)
  const addPerson = (event) =>{
      event.preventDefault()
      // We already have the current input value in the newName state!
      setPersons( persons.concat({name: newName, number: newNumber}))

      setNewName('');
      setNewNumber('');
  }
  const handleNameChange = (event) => {
      const newName = event.target.value;
      let isDuplicate = persons.some( person => person.name === newName)
      if(isDuplicate){
          return alert(`${newName} is already added to phonebook`)
      }
      setNewName(newName)
  }
  const handleNumberChange = (event) => {
      const number = event.target.value
      setNewNumber(number)

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
            number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map(person => <p key={person.name}>{person.name}-{person.number}</p>)}
    </div>
  )
}

export default App