import axios from "axios";
const baseUrl = `https://studies.cs.helsinki.fi/restcountries/`;

const getAll = () => {
   const response = axios.get(baseUrl+'api/all');
   return response.then (r => r.data)
}

const searchCountries = (filter) => {
   const request = axios.get(baseUrl+`api/name/${filter}`)
   return request.then (r => r.data)
}

export default {
 getAll, searchCountries
}