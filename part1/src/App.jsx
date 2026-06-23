import {useEffect, useMemo, useState} from 'react'
import PersonsForm from './components/PersonsForm'
import contactService from './services/contactService'
import countryService from './services/countryService'
import './App.css'
import Notification from "./components/Notifications.jsx";
import Countries from "./components/Countries.jsx";

const Filter = ({filter, setFilter})=> {
    const handleSearch = (event) => {
        setFilter(event.target.value)
        }
        return(
                    <p>Filter Countries by: <input value={filter} onChange={handleSearch}/></p>

            )

}


const App = () => {
    const [country, setCountry] = useState([]);
    const [notificationMessage, setNotificationMessage] = useState(null);
     // State for the notification's style
  const [notificationStyle, setNotificationStyle] = useState(''); // e.g., 'success' or 'error'

    const hook = () => {
        contactService.getAll()
            .then(initialPeople => setPersons(initialPeople))
            .catch(err => console.error('Error fetching and parsing data', err))
    }
    const countrySearchHook = async (searchTerm) =>{
            try{
                if(searchTerm && searchTerm.length > 3) {
                    const data = await countryService.searchCountries(searchTerm)
                    setCountry(data)
                }
            }catch(err){
                console.error('Error fetching and parsing data', err)
                setNotificationStyle(err)
                setNotificationMessage(`Added ${searchTerm}`);
            }

    }
    const countryHook = async () => {
        try{
            const data = await countryService.getAll();
            setCountry(data)
        }catch(err){
            console.error('Error fetching and parsing data', err)
        }
    }

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

 const handleSuccess = (personName) => {
    // Set the style to 'success' and provide a message
    setNotificationStyle('success');
    setNotificationMessage(`Added ${personName}`);

    // Make it disappear after a few seconds
    setTimeout(() => {
      setNotificationMessage(null);
    }, 3000);
  }

  const handleError = (reference, err) => {
        if(reference.name) {

        }
       const errorCode = err.status ? err.status : ''
      if(errorCode == 404) {
          setNotificationMessage(`Information for ${reference.name} has been removed from the server`);
      } else {
           setNotificationMessage(err || 'An error occurred.');
      }
    // Set the style to 'error' and provide a message
    setNotificationStyle('error');
    setNotificationMessage(err || 'An error occurred.');

    // Make it disappear after a few seconds
    setTimeout(() => {
      setNotificationMessage(null);
    }, 3000);
  }

  useEffect(() => {
      countryHook();
  }, []);

  const countriesToShow = country.filter( c => {
      return c.name.common.toLowerCase().includes(filter.toLowerCase())})

  return (
    <div>
   <Notification message={notificationMessage} className={notificationStyle}/>
   <Filter filter={filter} setFilter={setFilter}/>
      <h2>Country List</h2>
      <Countries countryList={countriesToShow} setFilter={setFilter} />

    </div>
  )
}

export default App