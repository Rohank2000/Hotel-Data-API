const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    name: String,
    category: {
      type: String,
      enum: ["Budget", "Mid-Range", "Resort", "Luxury"],
    },
    location: {
      type: String,
      require: true,
    },
    rating: {
      type: Number,
      max: 5,
      min: 0,
      default: 0,
    },
    reviews: [
      {
        type: String,
      },
    ],
    website: String,
    phoneNumber: {
      type: String,
      require: true,
    },
    checkInTime: {
      type: String,
      require: true,
    },
    checkOutTime: {
      type: String,
      require: true,
    },
    amenities: [
      {
        type: String,
      },
    ],
    priceRange: {
      type: String,
      enum: ["$$ (11-30)", "$$$ (31-60)", "$$$$ (61+)", "Other"],
    },
    reservationsNeeded: {
      type: Boolean,
      default: false,
    },
    isParkingAvailable: {
      type: Boolean,
      default: false,
    },
    isWifiAvailable: {
      type: Boolean,
      default: false,
    },
    isPoolAvailable: {
      type: Boolean,
      default: false,
    },
    isSpaAvailable: {
      type: Boolean,
      default: false,
    },
    isRestaurantAvailable: {
      type: Boolean,
      default: false,
    },
    photos: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const hotel = mongoose.model("hotel", hotelSchema);

module.exports = hotel;
