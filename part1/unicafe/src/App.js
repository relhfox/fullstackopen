import { useState } from "react"

const StatisticLine = ({text, value}) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const Statistics = ({good, neutral, bad}) => {
    
    const total = good + neutral + bad
    const averSum = good - bad
    const average = averSum / total
    const positive = good / total * 100

    if (total === 0) {
        return <p>No feedback was given yet</p>
    }

    return (
            <table>
                <tbody>
                    <StatisticLine text='Good' value={good} />
                    <StatisticLine text='Neutral' value={neutral} />
                    <StatisticLine text='Bad' value={bad} />
                    <StatisticLine text='Total' value={total} />
                    <StatisticLine text='Average' value={average} />
                    <StatisticLine text='Positive %' value={positive} />
                </tbody>
            </table>
    )
}

const Button = ({handler, text}) => {
    return <button onClick={handler}>{text}</button>
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

            <Button handler={like} text='Good!' />
            <Button handler={idgaf} text='Neutral' />
            <Button handler={dislike} text='Bad!' />

            <h2>Statistics</h2>

            <Statistics good={good} neutral={neutral} bad={bad} />
        </>
    )
}

export default App
