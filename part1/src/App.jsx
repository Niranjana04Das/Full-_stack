import { useState } from 'react'

// ---------- Button Component ----------
const Button = ({ text, onClick }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

// ---------- StatisticLine Component ----------
const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

// ---------- Statistics Component ----------
const Statistics = ({ good, neutral, bad }) => {

  const total = good + neutral + bad

  if (total === 0) {
    return <p>No feedback given</p>
  }

  const average = (good - bad) / total
  const positive = (good / total) * 100

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="total" value={total} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive + " %"} />
      </tbody>
    </table>
  )
}

// ---------- App Component ----------
const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>

      <h1>Give Feedback</h1>

      <Button text="good" onClick={() => setGood(good + 1)} />
      <Button text="neutral" onClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" onClick={() => setBad(bad + 1)} />

      <h1>Statistics</h1>

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />

    </div>
  )
}

export default App
