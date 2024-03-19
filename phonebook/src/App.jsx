import { useState, useEffect } from 'react'
import PersonForm from './component/PersonForm'
import Persons from './component/Persons'
import Filter from './component/Filter'
import service from './services/persons.js'

const Notification = ({message}) => {
  if (message !== null) {
    const notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  return (
    <>
    <div style={message.indexOf('has already been removed from server') < 0 ? notificationStyle : errorStyle}>
      {message}
    </div>
    </>
  )
  }
  return (
    <></>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  useEffect(() => {
  service
    .getAll().then(persons => {
      setPersons(persons)
    })
    .catch(error => {
      console.log(error)
    })
}, [])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter filter={filter} setFilter={setFilter}/>
      <h2>add a new</h2>
      <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} persons={persons} setPersons={setPersons} message={message} setMessage={setMessage}/>
      <h2>Numbers</h2>
      <Persons persons={persons} setPersons={setPersons} filter={filter}/>
    </div>
  )
}

export default App