const { model, Schema } = require('mongoose');

const placeSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['coffee_shop', 'bookstore']
    },
    location: {
      type: { type: String, default: 'Point' },
      coordinates: [Number]
    }
  },
  { timestamps: true }
);

const Place = model('Place', placeSchema);

module.exports = Place;
