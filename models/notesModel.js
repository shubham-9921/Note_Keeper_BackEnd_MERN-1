const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema({

    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    user: {
        type: mongoose.Schema.Types.Mixed,
        require: true,
        ref: "User"
    }

},
    {
        timestamps: true,
    })

const Notes = mongoose.model("Notes", noteSchema);
module.exports = Notes;