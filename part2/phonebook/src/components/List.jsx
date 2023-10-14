import requests from '../services/requests'

const List = ({persons, setPersons, setMessage, filter}) => {

    let toShow = []

    if (filter) {
        toShow = [...persons].filter(obj =>
            obj.name.toLowerCase().includes(filter.toLowerCase())
        )
    } else {
        toShow = [...persons]
    }

    const handleRemove = (id, name) => {

        const resetMessage = () => {
            setTimeout(() => {
                setMessage('')
            }, 5000)
        }

        if (window.confirm(`Delete ${name}?`)) {
            requests
                .remove(id)
                .then(response => {
                    setPersons(persons.filter(person => person.id !== id))
                    setMessage(`${name} was successfully removed from phonebook`)
                    resetMessage()
                })
                .catch(error => {
                    setPersons(persons.filter(person => person.id !== id))
                    setMessage(`Sorry, ${name} does not exist in phonebook`)
                    resetMessage()
                })
        }
    }

    return (
        <div>
            {toShow.map(person =>
                <p key={person.name}>
                    {person.name} {person.number}
                    <button onClick={() => handleRemove(person.id, person.name)}>delete</button>
                </p>
            )}
        </div>
    )
}

export default List
