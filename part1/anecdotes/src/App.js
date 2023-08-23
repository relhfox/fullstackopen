import { useState } from 'react'

const Anecdote = ({anecdotes, rating, index, title}) => {
    return (
        <div>
            <h2>Anecdote {title}</h2>

            "{anecdotes[index]}"

            <p>Has {rating[index]} likes</p>
        </div>
    )
}

const Buttn = ({handler, text}) => {
    return <button onClick={handler}>{text}</button>
}

const App = () => {
    
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ]
    
    const defaultRating = Array(8).fill(0)

    const [selected, setSelected] = useState(0)

    const [rating, setRating] = useState(defaultRating)

    const maxLikes = Math.max(...rating)

    const mostPopular = rating.indexOf(maxLikes)

    const randomAnecdote = () => {
        const randomize = Math.floor(Math.random() * 8)
        setSelected(randomize)
    }

    const ratingUp = () => {
        const whyTheStateUpdateIsSoAsyncProcess = [...rating]
        whyTheStateUpdateIsSoAsyncProcess[selected] += 1
        setRating(whyTheStateUpdateIsSoAsyncProcess)
    }

    return (
        <>
            <Anecdote
                anecdotes={anecdotes}
                rating={rating}
                index={selected}
                title='of the day'
            />
            
            <Buttn handler={ratingUp} text='+Like' />

            <br />
            <Buttn handler={randomAnecdote} text='Next anecdote' />

            <Anecdote
                anecdotes={anecdotes}
                rating={rating}
                index={mostPopular}
                title='with most likes'
            />
        </>
    )
}

export default App
