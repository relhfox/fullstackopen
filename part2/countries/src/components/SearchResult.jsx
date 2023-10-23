
const SearchResult = ({search, countryData, getFiltered}) => {

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
            return (
                <div style={font}>
                    <ul>
                        {filtered.map(country =>
                            <li key={country}>{country}</li>
                        )}
                    </ul>
                </div>
            )
        }

        if (countryData) {

            const languages = Object.values(countryData.languages)

            return (
                <div style={font}>
                    <h1>{countryData.name.common}</h1>
                    <p>Capital: {countryData.capital}</p>
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
                </div>
            )
        }
    }

    return null
}

export default SearchResult
