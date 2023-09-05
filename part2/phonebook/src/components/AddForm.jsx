import MyInput from "./MyInput"

const AddForm = ({handleName, handleNumber, addName, newName, newNumber}) => {
    return (
        <form>
            <MyInput handler={handleName} value={newName} text='Name' />
            <MyInput handler={handleNumber} value={newNumber} text='Number' />
            <button onClick={addName} type="submit">+add</button>
        </form>
    )
}

export default AddForm
