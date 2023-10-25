
const SearchResult = ({search, countryData, weather, getFiltered, setCurrent, setSearch}) => {

    const font = {
        fontSize: 20
    }

    if (search) {

        const filtered = getFiltered()
        
        if (filtered.length === 0) {
            return <div style={font}>No matches, please enter more specific</div>
        }

        if (filtered.length > 10) {
            return <div style={font}>Too many matches, please enter more specific</div>
        }

        if (filtered.length > 1) {

            const jumpTo = (country) => {
                setCurrent(country)
                setSearch(country)
            }

            return (
                <div style={font}>
                    <ul>
                        {filtered.map(country =>
                            <li key={country}>
                                {country}
                                <button onClick={() => jumpTo(country)}>show</button>
                            </li>
                        )}
                    </ul>
                </div>
            )
        }

        if (countryData && weather) {

            const languages = Object.values(countryData.languages)

            return (
                <div style={font}>
                    <h1>{countryData.name.common}</h1>
                    <p>Capital: {countryData.capital[0]}</p>
                    <p>Area: {countryData.area} km2</p>
                    <h2>Languages:</h2>
                    <ul>
                        {languages.map(language =>
                            <li key={language}>{language}</li>
                        )}
                    </ul>
                    <div style={{width: 330, border: 'solid', borderColor: 'lightgray'}}>
                        <img src={countryData.flags.png} />
                    </div>
                    <h2>Weather in {countryData.capital[0]}</h2>
                    <p>Temperature: {weather.current.temperature_2m} °C</p>
                    <p>Cloud cover: {weather.current.cloudcover} %</p>
                    <p>Wind: {weather.current.windspeed_10m} m/s</p>
                </div>
            )
        }
    }

    return null
}

export default SearchResult
