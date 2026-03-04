const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

morgan.token('body', (req) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
  { id: "1", name: "Arto Hellas", number: "040-123456" },
  { id: "2", name: "Ada Lovelace", number: "39-44-5323523" },
  { id: "3", name: "Dan Abramov", number: "12-43-234345" },
  { id: "4", name: "Mary Poppendieck", number: "39-23-6423122" }
]

/* 3.1 - Get all persons */
app.get('/api/persons', (req, res) => {
  res.json(persons)
})

/* 3.2 - Info page */
app.get('/info', (req, res) => {
  const date = new Date()
  res.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>
  `)
})

/* 3.3 - Get single person */
app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person = persons.find(p => p.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).json({ error: 'person not found' })
  }
})

/* 3.4 - Delete person */
app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  persons = persons.filter(p => p.id !== id)
  res.status(204).end()
})

/* 3.5 & 3.6 - Add new person */
app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'name or number missing'
    })
  }

  const nameExists = persons.some(p => p.name === body.name)

  if (nameExists) {
    return res.status(400).json({
      error: 'name must be unique'
    })
  }

  const newPerson = {
    id: String(Math.floor(Math.random() * 1000000)),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(newPerson)
  res.status(201).json(newPerson)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})