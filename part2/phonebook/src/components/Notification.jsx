const Notification = ({message}) => {

    const success = {
        color: 'green',
        background: 'lightgray',
        fontSize: 20,
        fontWeight: 'bold',
        borderStyle: 'solid',
        borderWidth: 3,
        borderRadius: 10,
        padding: 10,
        marginBottom: 10
    }

    const fail = {
        color: 'red',
        background: 'lightgray',
        fontSize: 20,
        fontWeight: 'bold',
        borderStyle: 'solid',
        borderWidth: 3,
        borderRadius: 10,
        padding: 10,
        marginBottom: 10
    }

    const flag = message.indexOf('Sorry')

    if (!message) {
        return null
    }

    return (
        <div style={flag === -1 ? success : fail}>
            {message}
        </div>
    )
}

export default Notification
