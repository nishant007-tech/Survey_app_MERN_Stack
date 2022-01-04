const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/userModel");
const SurveyModel = require("../models/survey_model");
const SurveyRespondentsModel = require("../models/survey_respondents_model");
const auth = require("./auth");

router.post("/register", async (req, res) => {
    const emailExist = await UserModel.findOne({ email: req.body.email });
    if (emailExist) {
        return res.status(400).json({ message: 'Email is already exist...!' });
    }
    if (!req.body.password) {
        return res.status(403).json({ message: 'Password is required!' });
    }
    //bcrypt the password basically into hash format for security reasons
    const salt = await bcrypt.genSalt(10);
    const hassedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new UserModel({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        age: req.body.age,
        role: req.body.role,
        password: hassedPassword
    });
    try {
        const savedUser = await user.save();
        res.json(savedUser);
    } catch (err) {
        res.status(400).json(err);
    }
})
router.post('/login', async (req, res) => {
    //checking if user is already exists
    let user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).json({ message: 'Email or Password is Wrong' });
    }
    //if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
        return res.status(400).json({ message: 'Invalid Password or Email' });
    }
    const token = jwt.sign({ id: user._id }, 'ThisIsSecretKey');

    res.json({ token: token, user: user, message: "Login Successful" });
});

router.get('/getuser', auth, async (req, res) => {
    const user = await UserModel.findOne({ _id: req.user });
    res.json({
        user: user
    });
});
router.post('/create-survey', auth, async (req, res) => {
    const newSurvey = await SurveyModel.create(req.body);
    res.json(newSurvey);
});

router.get('/get_all_surveys', auth, async (req, res) => {
    try {
        const allSurveys = await SurveyModel.find({ "campaign_author": req.user })
        res.json(allSurveys);
    } catch (error) {
        res.send(error)
    }
});
router.get('/get_all_user_surveys', auth, async (req, res) => {
    try {
        const user = await UserModel.findById(req.user);
        const allSurveys = await SurveyModel.find({
            $and: [
                { campaign_for: user?.gender },
                { age_limit: { $lte: user?.age } }
            ]
        }).populate(
            {
                path: "responses",
                // populate: {
                //     path: "userid"
                // }
            });
        res.json(allSurveys);
    } catch (error) {
        res.send(error)
    }
});
router.put('/send_survey_response/:id', auth, async (req, res) => {
    try {
        let resData = await SurveyRespondentsModel.create(req.body);
        let surveyData = await SurveyModel.findByIdAndUpdate(req.params.id, {
            $push: { responses: resData._id },
        },
            { new: true }
        );

        res.json(surveyData);
    } catch (error) {
        res.send(error)
    }
});
router.get('/get_survey_admin/:id', auth, async (req, res) => {
    const survey = await SurveyModel.findById({ _id: req.params.id }).populate("responses");
    res.json(survey);
});
router.delete('/delete_survey/:id', auth, async (req, res) => {
    try {
        await SurveyModel.deleteOne({ _id: req.params.id });
        const allSurveys = await SurveyModel.find({});
        res.json(allSurveys);
    } catch (error) {
        res.status(400).send(error)
    }
});
router.put('/edit_survey/:id', auth, async (req, res) => {
    try {
        let updatedSurvey = await SurveyModel.findByIdAndUpdate({ _id: req.params.id }, req.body);
        res.json(updatedSurvey);
    } catch (error) {
        res.status(400).send(error)
    }
});



module.exports = router;