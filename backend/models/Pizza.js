const mongoose = require('mongoose');

const pizzaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    varients: [],
    prices: [],
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false
    },
    description: {
        type: String,
    }
},
{ timestamps:true,
})

module.exports = mongoose.model("Pizza", pizzaSchema);

