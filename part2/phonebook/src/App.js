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

        const checkArray = [...persons].filter(obj =>
            obj.name.toLowerCase() === nameToAdd.name.toLowerCase()
        )

        if (checkArray.length === 0) {
            setPersons(persons.concat(nameToAdd))
            setNewName('')
        } else {
            alert(`${newName} is already added to phonebook`)
        }
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
