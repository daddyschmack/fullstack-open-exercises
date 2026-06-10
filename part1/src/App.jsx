import {useEffect, useState} from 'react'
import PersonsForm from './components/PersonsForm'
import contactService from './services/contactService'
import './App.css'

const Filter = ({filter, setFilter})=> {
    const handleSearch = (event) => {
        setFilter(event.target.value)
        }
        return(
                    <p>Filter Names by: <input value={filter} onChange={handleSearch}/></p>
            )

}

const ConfirmButton = ({method, person, action}) => {
    const handleClick = (event) => {
        event.preventDefault()
        if(window.confirm(`Are you sure you want to ${action.toLowerCase()} ${person.name}?`)){
            method(person.id)
        }
    };
    return (
        <button onClick={handleClick}>{action}</button>
    )
}

const Persons = (props) => {
    const personsToShow = props.persons.filter( person => person.name.toLowerCase().includes(props.filter.toLowerCase()))
    return (
        <ul className="personList">
            {personsToShow.map(person =>
                <li key={person.id}>{person.name} {person.number}
                <ConfirmButton action={"Delete"} method={() => props.deletePerson(person.id)} person={person}/>
                </li>)}
        </ul>
    )
}
const App = () => {
    const [persons, setPersons] = useState([]);
    const hook = () => {
        contactService.getAll()
            .then(initialPeople => setPersons(initialPeople))
            .catch(err => console.error('Error fetching and parsing data', err))
    }

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(hook, [])
  const addPerson = (event) =>{
      event.preventDefault()
      let isDuplicate = persons.some( person => person.name === newName)
      if(isDuplicate){
          const dupId = persons.find(person => person.name === newName).id
          if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
              updatePerson(dupId, {name: newName, number: newNumber})
          }
          // Clear the form and exit the function early so we don't try to create!
          setNewName('');
          setNewNumber('');
          return;
      }
      
      // We already have the current input value in the newName state!
      const newContact = {name: newName, number: newNumber}
      contactService.createContact(newContact)
          .then(returnedPerson => {
              setPersons(persons.concat(returnedPerson))
          })
          .catch(err => console.error('Error creating new contact', err))

      setNewName('');
      setNewNumber('');
  }
  const deletePerson = (id) => {
        contactService.deleteContact(id)
            .then(returnedPerson => {
                setPersons(persons.filter(person => person.id !== id))
            })
            .catch(err => console.error('Error deleting contact', err))
  }
  const updatePerson = (id, updatedPerson) => {
        contactService.updateContact(id, updatedPerson)
            .then(returnedPerson => {
                setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
            })
            .catch(err => console.error('Error updating contact', err))
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
          deletePerson={deletePerson}
          updatePerson={updatePerson}
      />
      <h2>Numbers</h2>
        <Persons persons={persons} filter={filter} deletePerson={deletePerson}
        updatePerson={updatePerson}/>
    </div>
  )
}

export default App