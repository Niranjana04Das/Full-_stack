import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent...',
    'Any fool can write code...',
    'Premature optimization...',
    'Debugging is twice as hard...',
    'Programming without console.log...',
    'The only way to go fast...'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(
    new Array(anecdotes.length).fill(0)
  )

  const nextAnecdote = () => {
    const rand = Math.floor(Math.random() * anecdotes.length)
    setSelected(rand)
  }

  const vote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>

      <button onClick={vote}>vote</button>
      <button onClick={nextAnecdote}>next anecdote</button>
    </div>
  )
}

export default App
