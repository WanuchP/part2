const Person = ({person}) => {
    return (
        <>
        <p>{person.name} {person.number}</p>
        </>
    )
}

const Persons = ({persons, filter}) => {
    const personToShow = persons.filter(person => person.name.indexOf(filter) !== -1)
    return (
        <>
        {personToShow.map(person =>
            <Person key={person.id} person={person}/>
        )}
        </>
    )
}

export default Persons