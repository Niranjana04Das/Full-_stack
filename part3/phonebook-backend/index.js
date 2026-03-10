const express = require('express')
const cors = require('cors')
require('dotenv').config()

const Person = require('./models/person')
const middleware = require('./utils/middleware')

const app = express()

app.use(cors())
app.use(express.json())

/* ---------------- GET ALL PERSONS ---------------- */

app.get('/api/persons', (request, response, next) => {

  Person.find({})
    .then(persons => {
      response.json(persons)
    })
    .catch(error => next(error))

})

/* ---------------- GET PERSON BY ID ---------------- */

app.get('/api/persons/:id', (request, response, next) => {

  Person.findById(request.params.id)
    .then(person => {

      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }

    })
    .catch(error => next(error))

})

/* ---------------- DELETE PERSON ---------------- */

app.delete('/api/persons/:id', (request, response, next) => {

  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))

})

/* ---------------- ADD PERSON ---------------- */

app.post('/api/persons', (request, response, next) => {

  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))

})

/* ---------------- UPDATE PERSON (Exercise 3.17) ---------------- */

app.put('/api/persons/:id', (request, response, next) => {

  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(
    request.params.id,
    person,
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))

})

/* ---------------- INFO ROUTE ---------------- */

app.get('/info', (request, response, next) => {

  Person.find({})
    .then(persons => {

      const date = new Date()

      response.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${date}</p>
      `)

    })
    .catch(error => next(error))

})

/* ---------------- ERROR HANDLER ---------------- */

app.use(middleware.errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})