import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then (r => r.data)
}

const createContact = (newContact) => {
    const request = axios.post(baseUrl, newContact)
    return request.then( r => r.data)
}

const updateContact = (id, updatedContact) => {
    console.log('in updated contact',updatedContact)
    const request = axios.put( `${baseUrl}/${id}`, updatedContact)
    return request.then( r => r.data)
}

const deleteContact = (id) => {
  const request =  axios.delete(`${baseUrl}/${id}`)
  return request.then( r => r.data)
}

function delContactFX(id){
    const req = axios.delete(`${baseUrl}/${id}`)
    return req.then( r => r.data)
}


export default {
    getAll, createContact, updateContact, deleteContact, delContactFX
}