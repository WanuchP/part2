const PersonForm = ({newName, setNewName, newNumber, setNewNumber, persons, setPersons}) => {

    const addPerson = (event) => {
        event.preventDefault()
        const personObj = {
            name: newName,
            number: newNumber,
            id: persons.length+1,
        }
        if (persons.map(person=>person.name).indexOf(personObj.name) === -1) {
            setPersons(persons.concat(personObj))
            setNewName('')
            setNewNumber('')
        } else {
            alert(`${personObj.name} is already added to phonebook`)
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