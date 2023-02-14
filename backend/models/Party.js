const mongoose = require("mongoose");

const { Schema } = mongoose;

const { serviceSchema } = require("./Service");

const partySchema = new Schema(
  {
    title: {
      type: String,
      rewuired: true,
    },
    author: {
      type: String,
      rewuired: true,
    },
    description: {
      type: String,
      rewuired: true,
    },
    budget: {
      type: Number,
      rewuired: true,
    },
    image: {
      type: String,
      rewuired: true,
    },
    services: {
      type: [serviceSchema],
    },
  },
  { timestamps: true }
);

const Party = mongoose.model("Party", partySchema);
module.exports = Party;
