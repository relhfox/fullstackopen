import { useState, useEffect } from 'react'
import axios from 'axios'
import SearchResult from './components/SearchResult'

function App() {

    const [search, setSearch] = useState('')

    const [countries, setCountries] = useState([])

    const [current, setCurrent] = useState('')

    const [countryData, setCountryData] = useState(null)

    const [weather, setWeather] = useState(null)

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
        if (search) {
            const filtered = getFiltered()

            if (filtered.length === 1) {
                setCurrent(filtered[0])
            }
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

    useEffect(() => {
        if (countryData) {
            const lat = countryData.capitalInfo.latlng[0]
            const lng = countryData.capitalInfo.latlng[1]
            axios
                .get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,cloudcover,windspeed_10m&windspeed_unit=ms&forecast_days=1`)
                .then(response => {
                    setWeather(response.data)
                })
                .catch(err => console.log('A weather request has failed'))
        }
    }, [countryData])

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
                weather={weather}
                getFiltered={getFiltered}
                setCurrent={setCurrent}
                setSearch={setSearch}
            />
        </div>
    )
}

export default App
