const mongoose = require('mongoose')

// Command line arguments
const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

if (!password) {
  console.log('give password as argument')
  process.exit(1)
}

/*
🔐 IMPORTANT:
Replace:
  YOUR_DB_USERNAME
  cluster0.xxxxx
With your real MongoDB Atlas username and cluster address
*/

const url = 
  `mongodb+srv://niranjanaUser:${password}@cluster0.abcd123.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

// Schema
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

// Model
const Person = mongoose.model('Person', personSchema)


// 🟢 If only password → list all persons
if (process.argv.length === 3) {

  console.log('phonebook:')

  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })

// 🟢 If password + name + number → add new person
} else if (process.argv.length === 5) {

  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })

} else {
  console.log('Usage:')
  console.log('List: node mongo.js <password>')
  console.log('Add:  node mongo.js <password> "Name" "Number"')
  mongoose.connection.close()
}