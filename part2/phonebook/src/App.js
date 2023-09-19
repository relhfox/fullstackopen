import { useState, useEffect } from 'react'
import axios from 'axios'
import AddForm from './components/AddForm'
import List from './components/List'
import Filter from './components/Filter'

const App = () => {

    const [persons, setPersons] = useState([])

    const [filter, setFilter] = useState('')

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    useEffect(() => {
        axios
          .get('http://localhost:3001/persons')
          .then(response => {
            console.log('promise fulfilled')
            setPersons(response.data)
        })
    }, [])

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
