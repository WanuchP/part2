import { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './component/Search.jsx'
import Display from './component/Display.jsx'

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [display, setDisplay] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all').then(response => {
        console.log('success')
        setCountries(response.data)})
      .catch(error => {
        console.log(error)
      })
  }, [])
      
  const handleChange = (event) => {
    const searchVal = event.target.value
    setSearch(searchVal)
    setDisplay(countries.filter(c => c.name.common.toLowerCase().indexOf(searchVal) !== -1))
  }
  return (
    <>
    <Search value={search} onChange={handleChange}/>
    <Display display={display} setDisplay={setDisplay}/>
    </>
  )
}

export default App
