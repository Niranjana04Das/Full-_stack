const mongoose = require('mongoose')

const phoneValidator = (number) => {

  const regex = /^\d{2,3}-\d+$/

  if (!regex.test(number)) {
    return false
  }

  if (number.length < 8) {
    return false
  }

  return true
}

const personSchema = new mongoose.Schema({

  name: {
    type: String,
    minlength: 3,
    required: true
  },

  number: {
    type: String,
    required: true,

    validate: {
      validator: phoneValidator,
      message: props => `${props.value} is not a valid phone number`
    }
  }

})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)