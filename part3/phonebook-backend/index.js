const express = require('express')
const mongoose = require('mongoose')
const app = express()

const Person = require('./models/person')

// middleware
app.use(express.json())
app.use(express.static('build'))

// connect to MongoDB
const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })


// GET all persons
app.get('/api/persons', (request, response) => {
  Person.find({})
    .then(persons => {
      response.json(persons)
    })
})


// GET one person
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


// DELETE person
app.delete('/api/persons/:id', (request, response, next) => {

  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


// ADD new person
app.post('/api/persons', (request, response, next) => {

  const body = request.body
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
    .catch(error => next(error))
})


// UPDATE person
app.put('/api/persons/:id', (request, response, next) => {

  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(
    request.params.id,
    person,
    {
      new: true,
      runValidators: true,
      context: 'query'
    }
  )
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})


// UNKNOWN ENDPOINT
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


// ERROR HANDLER (Exercise 3.19)
const errorHandler = (error, request, response, next) => {

  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)


// SERVER
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})