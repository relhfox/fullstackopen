import { useState, useEffect } from 'react'
import AddForm from './components/AddForm'
import List from './components/List'
import Filter from './components/Filter'
import Notification from './components/Notification'
import requests from './services/requests'

const App = () => {

    const [persons, setPersons] = useState([])

    const [filter, setFilter] = useState('')

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const [message, setMessage] = useState('')

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

        const clearInputs = () => {
            setNewName('')
            setNewNumber('')
            setTimeout(() => {
                setMessage('')
            }, 5000)
        }

        const duplicate = persons.find(person =>
            person.name.toLowerCase() === newName.toLowerCase()
        )

        if (!duplicate) {

            const nameToAdd = { name: newName, number: newNumber }
            
            requests
                .create(nameToAdd)
                .then(returnedName => {
                    setPersons(persons.concat(returnedName))
                    setMessage(`${returnedName.name} added to phonebook`)
                    clearInputs()
                })

        } else {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {

                const url = `http://localhost:3001/persons/${duplicate.id}`
                const changedObject = { ...duplicate, number: newNumber }

                requests
                    .update(url, changedObject)
                    .then(returnedName => {
                        setPersons(persons.map(person => person.id !== duplicate.id ? person : returnedName))
                        setMessage(`${returnedName.name}'s number updated successfully`)
                        clearInputs()
                    })
                    .catch(error => {
                        setPersons(persons.filter(person => person.name !== changedObject.name))
                        setMessage(`Sorry, ${changedObject.name} does not exist in phonebook`)
                        clearInputs()
                    })
            }
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>

            <Notification message={message} />

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
                setMessage={setMessage}
                filter={filter}
            />
        </div>
    )
}

export default App
