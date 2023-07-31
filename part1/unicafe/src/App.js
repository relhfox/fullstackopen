import { useState } from "react"

const Statistics = ({good, neutral, bad}) => {
    
    const total = good + neutral + bad
    const averSum = good - bad
    const average = averSum / total
    const positive = good / total * 100

    if (total === 0) {
        return <p>No feedback was given yet</p>
    }

    return (
        <>
            <p>Good: {good}</p>
            <p>Neutral: {neutral}</p>
            <p>Bad: {bad}</p>
            <p>Total: {total}</p>
            <p>Average: {average}</p>
            <p>Positive: {positive}%</p>
        </>
    )
}

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

            <Statistics good={good} neutral={neutral} bad={bad} />
        </>
    )
}

export default App
