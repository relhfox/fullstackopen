const List = ({persons, filter}) => {

    let toShow = []

    if (filter) {
        toShow = [...persons].filter(obj =>
            obj.name.toLowerCase().includes(filter.toLowerCase())
        )
    } else {
        toShow = [...persons]
    }

    return (
        <div>
            {toShow.map(person =>
                <p key={person.name}>{person.name} {person.number}</p>
            )}
        </div>
    )
}

export default List
