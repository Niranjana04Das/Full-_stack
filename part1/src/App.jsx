import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent...',
    'Any fool can write code that a computer can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code...',
    'Programming without console.log is like doctor without tests.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] =
    useState(new Array(anecdotes.length).fill(0))

  const nextAnecdote = () => {
    const randomIndex =
      Math.floor(Math.random() * anecdotes.length)

    setSelected(randomIndex)
  }

  const vote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const maxVotes = Math.max(...votes)
  const maxIndex = votes.indexOf(maxVotes)

  return (
    <div>

      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>Votes: {votes[selected]}</p>

      <button onClick={vote}>Vote</button>
      <button onClick={nextAnecdote}>Next anecdote</button>

      <h2>Top voted anecdote</h2>
      <p>{anecdotes[maxIndex]}</p>
      <p>Votes: {maxVotes}</p>

    </div>
  )
}

export default App
