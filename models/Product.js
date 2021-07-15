const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  sku: {type: String, required: true},
  type: {type: String, required: true},
  name: {type: String, required: true},
  price: {type: Number, required: true},
  currency: {type: String, default: 'Rub'},
  description: {type: String, default: 'None' },
  user: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Product', schema)
