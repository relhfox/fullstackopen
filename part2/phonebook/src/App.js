import { useState, useEffect } from 'react'
import AddForm from './components/AddForm'
import List from './components/List'
import Filter from './components/Filter'
import requests from './services/requests'

const App = () => {

    const [persons, setPersons] = useState([])

    const [filter, setFilter] = useState('')

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    useEffect(() => {
        requests
            .getAll()
            .then(personsFromServer => {
                console.log('promise fulfilled')
                setPersons(personsFromServer)
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
            
            requests
                .create(nameToAdd)
                .then(returnedName => {
                    setPersons(persons.concat(returnedName))
                    setNewName('')
                    setNewNumber('')
            })

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

            <Filter
                handleFilter={handleFilter}
                filter={filter}
            />
            
            <List
                persons={persons}
                setPersons={setPersons}
                filter={filter}
            />
        </div>
    )
}

export default App
