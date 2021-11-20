const mongoose = require("mongoose");

const Response = mongoose.model(
    "SurveyResponses",
    new mongoose.Schema({
        userid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UsersForSurveyApp"
        },
        username: {
            type: String
        },
        responsetext: {
            type: String
        },
    },
        { timestamps: true }
    )
);

module.exports = Response;