import { useState } from 'react'

const App = () => {

    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '+380 123 23 23' }
    ]) 

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleName = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    const handleNumber = (event) => {
        console.log(event.target.value)
        setNewNumber(event.target.value)
    }

    const addName = (event) => {
        event.preventDefault()

        const checkArray = [...persons].filter(obj =>
            obj.name.toLowerCase() === newName.toLowerCase()
        )

        if (checkArray.length === 0) {
            const nameToAdd = { name: newName, number: newNumber }
            setPersons(persons.concat(nameToAdd))
            setNewName('')
            setNewNumber('')
        } else {
            alert(`${newName} is already added to phonebook`)
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>

            <form>
                Name: <input onChange={handleName} value={newName} />
                <br />
                Number: <input onChange={handleNumber} value={newNumber} />
                <br />
                <button onClick={addName} type="submit">+add</button>
            </form>

            <h2>Numbers</h2>
            
            {persons.map(person =>
                <p key={person.name}>{person.name} {person.number}</p>
            )}
        </div>
    )
}

export default App
