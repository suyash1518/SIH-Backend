require('dotenv').config();
const express = require('express');
const router = express.Router();
const RegistrationForm = require('../models/RegistrationForm.js');
const { body, validationResult } = require('express-validator');
const User = require('../middleware/userInfo.js');


// const shhh = process.env.JWT_SECRET;

// Route 1 : Adding RegistrationForm
// Base link address = http://localhost:5000/user/RegistrationForm

router.post('/addRegistrationForm', User, [
    body('companyname', 'Enter a valid company name').notEmpty(),
    body('director', 'Enter a valid director name').notEmpty(),
    body('email', 'Enter a valid email').isEmail(),
    body('phoneno', 'Enter a valid phone number').isLength({ min: 10, max: 10 }),
    body('addressd', 'Enter a valid address').notEmpty(),
    body('addressc', 'Enter a valid address for customer').notEmpty(),
    body('aadhar', 'Enter a valid aadhar number').notEmpty(),
    body('pancard', 'Enter a valid pan number').notEmpty(),
    body('voterid', 'Enter a valid voter ID').notEmpty(),
    body('passbook', 'Enter a valid passbook').notEmpty(),
    body('companylogo', 'Enter a valid company logo').notEmpty(),
    body('companydocumentation', 'Enter valid company documentation').notEmpty(),
    body('sector', 'Enter a valid sector').notEmpty()
], async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ success: false, error: result.array() });
    }

    try {
        const userId = req.user;

        let finding = await RegistrationForm.findOne({ email: req.body.email});
        if (finding) {
            return res.status(400).json({ success: false, error: "Email already exists" });
        }

        let newRegistrationForm = new RegistrationForm({
            companyname: req.body.companyname,
            director: req.body.director,
            email: req.body.email,
            phoneno: req.body.phoneno,
            addressd: req.body.addressd,
            addressc: req.body.addressc,
            aadhar: req.body.aadhar,
            pancard: req.body.pancard,
            voterid: req.body.voterid,
            passbook: req.body.passbook,
            companylogo: req.body.companylogo,
            companydocumentation: req.body.companydocumentation,
            sector: req.body.sector,
            userId: userId
        });

        const saveRegistrationForm = await newRegistrationForm.save();
        res.status(200).json(saveRegistrationForm);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Some error occurred" });
    }
});



 // Route : 2 : Deleting the RegistrationForm
 router.delete('/deleteRegistrationForm/:id',async (req, res) => {
    try {
        let cloth = await RegistrationForm.findById(req.params.id);
        if (!cloth) {
            return res.status(404).json({ error: "Error While Finding" });
        }
        await RegistrationForm.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Some Error Occurred" });
    }
});



// Route 3 : To update the RegistrationForm
router.put(
    '/updateRegistrationForm/:id',
    [
        body('comanyname').optional().isString(),
        body('director').optional().isString(),
        body('email').optional().isEmail(),
        body('phoneno').optional().isNumeric(),
        body('addressd').optional().isString(),
        body('addressc').optional().isString(),
        body('aadhar').optional().isNumeric(),
        body('pancard').optional().isNumeric(),
        body('voterid').optional().isNumeric(),
        body('passbook').optional().isNumeric(),
        body('companylogo').optional().isString(),
        body('companydocumentation').optional().isString(),
        body('sector').optional().isString()


    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { companyname, director, email, phoneno,addressc, addressd, aadhar, pancard, voterid, passbook, companylogo,companydocumentation, sector } = req.body;
            const updateRegistrationForm = {};
            if (companyname) updateRegistrationForm.companyname = companyname;
            if (director) updateRegistrationForm.director = director;
            if (email) updateRegistrationForm.email = email;
            if (phoneno) updateRegistrationForm.phoneno = phoneno;
            if (addressc) updateRegistrationForm.addressc = addressc;
            if (addressd) updateRegistrationForm.addressd = addressd;
            if (aadhar) updateRegistrationForm.aadhar = aadhar;
            if (pancard) updateRegistrationForm.pancard = pancard;
            if (voterid) updateRegistrationForm.voterid = voterid;
            if (passbook) updateRegistrationForm.passbook = passbook;
            if (companylogo) updateRegistrationForm.companylogo = companylogo;
            if (companydocumentation) updateRegistrationForm.companydocumentation = companydocumentation;
            if (sector) updateRegistrationForm.sector = sector;

           

            let form = await RegistrationForm.findById(req.params.id);
            if (!form) {
                return res.status(404).json({ error: "Error found" });
            }

            form = await RegistrationForm.findByIdAndUpdate(req.params.id, { $set: updateRegistrationForm }, { new: true });

            res.status(200).json(form);

        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: "Some Error Occurred" });
        }
    }
);



    // Route 4 : Fetching all RegistrationForm
    router.get('/fetchRegistrationForm', async (req, res) => {
        try {
            const form = await RegistrationForm.find();
            res.status(200).json(form);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: "Some error occurred" });
        }
    });

        
    

module.exports = router;