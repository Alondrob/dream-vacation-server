const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PropertySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  zipCode: { type: String, required: true },
  lat: { type: Number, required: false },
  lng: { type: Number, required: false },
  propertyType: { type: String },
  guests: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  noOfBeds: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  pricePerNight: { type: Number, required: true },
  amenities: [String],

  liked: { type: Boolean, required: false },
  image: [String],
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  booking: {
    bookedBy: {
      type: [mongoose.Types.ObjectId],
      ref: "User",
    },

    dates: {
      type: [Date],
    },
  },

  updated: {
    type: Date,
    default: Date.now(),
  },
});

const PropertyModel = mongoose.model("PropertyModel", PropertySchema);

module.exports = PropertyModel;
