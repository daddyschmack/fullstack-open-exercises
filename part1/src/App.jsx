import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')
  const addPerson = (event) =>{
      event.preventDefault()
      // We already have the current input value in the newName state!
      setPersons( persons.concat({name: newName}))

      setNewName('');
  }
  const handleNameChange = (event) => {
      const newName = event.target.value;
      let isDuplicate = persons.filter( person => person.name === newName)
      if(isDuplicate.length > 0){
          return alert(`${newName} is already added to phonebook`)
      }
      setNewName(newName)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map(person => <p key={person.name}>{person.name}</p>)}
    </div>
  )
}

export default App