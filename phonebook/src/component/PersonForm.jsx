import service from '../services/persons.js'

const PersonForm = ({newName, setNewName, newNumber, setNewNumber, persons, setPersons, message, setMessage}) => {

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
                    setMessage(`Added ${returnPerson.name}`)
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
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
                        setMessage(`Updated ${personObj.name} number`)
                        setTimeout(() => {
                            setMessage(null)
                        }, 5000)
                    })
                    .catch(error => {
                    console.log(error)
                    setMessage(`Information of ${personObj.name} has already been removed from server`)
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
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