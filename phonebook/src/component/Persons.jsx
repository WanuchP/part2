import service from '../services/persons.js'

const Person = ({person, persons, setPersons}) => {
    const deleteHandler = () => {
        if (window.confirm(`Delete ${person.name} ?`)) {
            service
                .deletePerson(person.id).then(response => {
                    setPersons(persons.filter(p => p.id!== person.id))
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
    return (
        <>
        <p>{person.name} {person.number} <button onClick={deleteHandler} person={person}>delete</button> </p>
        </>
    )
}

const Persons = ({persons, setPersons ,filter}) => {
    const personToShow = persons.filter(person => person.name.indexOf(filter) !== -1)
    return (
        <>
        {personToShow.map(person =>
            <Person key={person.id} person={person} persons={persons} setPersons={setPersons}/>
        )}
        </>
    )
}

export default Persons