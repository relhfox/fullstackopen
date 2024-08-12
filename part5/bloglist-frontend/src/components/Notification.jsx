const Notification = ({ message }) => {

    const errFlag = message.indexOf('Sorry')

    const notiStyle = {
        color: errFlag === -1 ? 'green' : 'red',
        background: 'lightgray',
        fontSize: 20,
        fontWeight: 'bold',
        borderStyle: 'solid',
        borderWidth: 3,
        borderRadius: 10,
        padding: 10,
        marginBottom: 10
    }

    if (!message) {
        return null
    }

    return (
        <div style={notiStyle}>
            {message}
        </div>
    )
}

export default Notification
