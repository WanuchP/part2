import service from '../services/persons.js'

const PersonForm = ({newName, setNewName, newNumber, setNewNumber, persons, setPersons}) => {

    const addPerson = (event) => {
        event.preventDefault()
        const personObj = {
            name: newName,
            number: newNumber
        }
        const ind = persons.map(person=>person.name).indexOf(personObj.name)
        if (ind  === -1) {
            service
                .create(personObj).then(returnPerson => {
                    setPersons(persons.concat(returnPerson))
                    setNewName('')
                    setNewNumber('')
                })
                .catch(error => {
                    console.log(error)
                })
        } else {
            if (window.confirm(`${personObj.name} is already added to phonebook, replace the old number with a new one?`)) {
                service
                    .update(persons[ind].id, personObj).then(returnPerson =>{
                        setPersons(persons.map(p => p.id !== returnPerson.id ? p : returnPerson))
                        setNewName('')
                        setNewNumber('')
                    })
                    .catch(error => {
                    console.log(error)
                    })
            }
        }
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    return (
    <form onSubmit={addPerson}>
        <div>
            name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
            number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
    )
}

export default PersonForm