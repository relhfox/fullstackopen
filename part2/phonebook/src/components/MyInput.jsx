const MyInput = ({text, handler, value}) => {
    return (
        <>
            {text}: <input onChange={handler} value={value} />
            <br />
        </>
    )
}

export default MyInput
