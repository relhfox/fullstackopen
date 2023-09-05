import MyInput from "./MyInput"

const Filter = ({handleFilter, filter}) => {
    return (
        <div>
            <MyInput handler={handleFilter} value={filter} text='Filter by name' />
        </div>
    )
}

export default Filter
