import { useState } from 'react'

const App = () => {

    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ]) 

    const [newName, setNewName] = useState('')

    const handleInput = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    const addName = (event) => {
        event.preventDefault()
        const nameToAdd = { name: newName }
        setPersons(persons.concat(nameToAdd))
        setNewName('')
    }

    return (
        <div>
            <h2>Phonebook</h2>

            <form>
                Add name: <input onChange={handleInput} value={newName} />
                <button onClick={addName} type="submit">+add</button>
            </form>

            <h2>Numbers</h2>
            
            {persons.map(person =>
                <p key={person.name}>{person.name}</p>
            )}
        </div>
    )
}

export default App
