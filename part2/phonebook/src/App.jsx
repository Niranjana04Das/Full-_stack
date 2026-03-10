import { useState, useEffect } from 'react'
import personService from './services/persons'


// Notification component
const Notification = ({ message }) => {

  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}


const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }

    personService
      .create(newPerson)

      .then(returnedPerson => {

        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')

      })

      .catch(error => {

        setErrorMessage(error.response.data.error)

        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)

      })
  }


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }


  return (
    <div>

      <h2>Phonebook</h2>

      <Notification message={errorMessage} />

      <form onSubmit={addPerson}>

        <div>
          name:
          <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>

        <div>
          number:
          <input
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>

        <div>
          <button type="submit">add</button>
        </div>

      </form>


      <h2>Numbers</h2>

      {persons.map(person =>
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      )}

    </div>
  )
}

export default App