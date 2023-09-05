import { useState } from 'react'
import AddForm from './components/AddForm'
import List from './components/List'
import Filter from './components/Filter'

const App = () => {

    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '+380 123 23 23' },
        { name: 'John Lennon', number: '+440 342 12 77' },
        { name: 'Ringo Starr', number: '+560 312 34 52' },
        { name: 'Paul McCartney', number: '+210 777 45 98' },
        { name: 'George Harrison', number: '+330 655 65 02' }
    ]) 

    const [filter, setFilter] = useState('')

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleFilter = (event) => {
        setFilter(event.target.value)
    }

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

            <AddForm
                handleName={handleName}
                handleNumber={handleNumber}
                addName={addName}
                newName={newName}
                newNumber={newNumber}
            />

            <h2>Numbers</h2>

            <Filter handleFilter={handleFilter} filter={filter} />
            
            <List persons={persons} filter={filter} />
        </div>
    )
}

export default App
