const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema(
  {
  
    description: String,
    city: { 
      type: String, 
      default: "" 
    },
    area: { 
      type: String, 
      default: "" 
    },
    type: { 
      type: String, 
      default: "" 
    },
    price: { 
      type: String, 
      required: true 
    },
    bedrooms: { 
      type: Number, 
      default: 0 
    },
    shared: { 
      type: Boolean, 
      default: false 
    },
    main_picture: { 
      type: String, 
      default: null 
    },
    picture1: { 
      type: String, 
      default: null 
    },
    picture2: { 
      type: String, 
      default: null 
    },
    picture3: { 
      type: String, 
      default: null 
    },
  },
  { timestamps: true }
);


const House = mongoose.model("House", houseSchema);

module.exports = House;