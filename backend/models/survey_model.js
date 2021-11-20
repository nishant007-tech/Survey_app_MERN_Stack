const mongoose = require("mongoose")

const SurveySchema = mongoose.Schema({
    campaign_title: {
        type: String
    },
    campaign_for: {
        type: String
    },
    age_limit: {
        type: Number
    },
    campaign_body: {
        type: String
    },
    campaign_author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UsersForSurveyApp",
    },
    responses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SurveyResponses",
        }
    ]
},
    { timestamps: true }
)



const SurveyModel = mongoose.model("SurveySchema", SurveySchema);

module.exports = SurveyModel