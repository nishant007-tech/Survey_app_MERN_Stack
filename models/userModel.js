const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    },
    role: {
        type: String
    }
},
    { timestamps: true }
);

const user = mongoose.model("UsersForSurveyApp", userSchema);

module.exports = user;