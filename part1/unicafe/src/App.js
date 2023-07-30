import { useState } from "react"

const App = () => {

    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const like = () => setGood(good + 1)
    const idgaf = () => setNeutral(neutral + 1)
    const dislike = () => setBad(bad + 1)

    return (
        <>
            <h1>What is your feedback?</h1>

            <button onClick={like}>Good!</button>
            <button onClick={idgaf}>Neutral</button>
            <button onClick={dislike}>Bad!</button>

            <h2>Statistics</h2>
            
            <p>Good: {good}</p>
            <p>Neutral: {neutral}</p>
            <p>Bad: {bad}</p>
        </>
    )
}

export default App
