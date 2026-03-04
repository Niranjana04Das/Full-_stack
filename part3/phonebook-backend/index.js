const express = require('express')
const app = express()
const morgan = require('morgan')
app.use(express.json())
morgan.token('body', function (req) {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const persons = [
  { id: "1", name: "Arto Hellas", number: "040-123456" },
  { id: "2", name: "Ada Lovelace", number: "39-44-5323523" },
  { id: "3", name: "Dan Abramov", number: "12-43-234345" },
  { id: "4", name: "Mary Poppendieck", number: "39-23-6423122" }
]

/* 3.1 */
app.get('/api/persons', (req, res) => {
  res.json(persons)
})

/* 3.2 */
app.get('/info', (req, res) => {
  const requestTime = new Date()
  res.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${requestTime}</p>
  `)
})

/* 3.3 */
app.get('/api/persons/:id', (req, res) => {
  const person = persons.find(p => p.id === req.params.id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).json({ error: 'person not found' })
  }
})

/* 3.4 */
app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const index = persons.findIndex(p => p.id === id)

  if (index !== -1) {
    persons.splice(index, 1)
    res.status(204).end()
  } else {
    res.status(404).json({ error: 'person not found' })
  }
})

/* 3.5 */
app.post('/api/persons', (req, res) => {
  const { name, number } = req.body

  /* 3.6 validation */
  if (!name || !number) {
    return res.status(400).json({ error: 'name or number missing' })
  }

  if (persons.some(p => p.name === name)) {
    return res.status(400).json({ error: 'name must be unique' })
  }

  const newPerson = {
    id: Math.floor(Math.random() * 1000000).toString(),
    name,
    number
  }

  persons.push(newPerson)
  res.json(newPerson)
})

/* Middleware: unknown endpoint */
const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})