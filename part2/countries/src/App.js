import { useState, useEffect } from 'react'
import axios from 'axios'
import SearchResult from './components/SearchResult'

function App() {

    const [search, setSearch] = useState('')

    const [countries, setCountries] = useState([])

    const [current, setCurrent] = useState('')

    const [countryData, setCountryData] = useState(null)

    useEffect(() => {
        axios
            .get('https://studies.cs.helsinki.fi/restcountries/api/all')
            .then(response => {
                const result = response.data.map(obj => obj.name.common)
                setCountries(result)
            })
            .catch(err => console.log('All countries request has failed'))
    }, [])

    useEffect(() => {
        const filtered = getFiltered()

        if (filtered.length === 1) {
            setCurrent(filtered[0])
        }
    }, [search])

    useEffect(() => {
        if (current) {
            axios
                .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${current}`)
                .then(response => {
                    setCountryData(response.data)
                })
                .catch(err => console.log('A certain country request has failed'))
        }
    }, [current])

    const getFiltered = () => {
        const result = [...countries].filter(country =>
            country.toLowerCase().includes(search.toLowerCase())
        )
        return result
    }

    const handleInput = (event) => {
        setSearch(event.target.value)
    }

    return (
        <div>
            Find country by name: <input onChange={handleInput} value={search} />
            <SearchResult
                search={search}
                countryData={countryData}
                getFiltered={getFiltered}
            />
        </div>
    )
}

export default App
