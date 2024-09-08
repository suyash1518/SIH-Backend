require('dotenv').config();
const express = require('express');
const router = express.Router();
const RegistrationForm = require('../models/RegistrationForm.js');
const { body, validationResult } = require('express-validator');
const User = require('../middleware/userInfo.js');
const mongoose = require('mongoose');

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
    body('bp', 'Enter a valid business plan').notEmpty(),
    body('poa', 'Enter a valid proof of assets').notEmpty(),
    body('ip', 'Enter a valid investment plan').notEmpty(),
    body('fs', 'Enter a valid financial statements').notEmpty(),
    body('cc', 'Enter a valid cash flow').notEmpty(),
    body('sector', 'Enter a valid sector').notEmpty(),
    body('coapr', 'Enter a valid cost of assets ratio'),
    body('pfail', 'Enter a valid profitability failure ratio'),
    body('ctr', 'Enter a valid current ratio'),
    body('ml', 'Enter a valid market leverage'),
    body('gmpc', 'Enter a valid gross margin percentage'),
    body('ypc', 'Enter a valid yearly profitability'),
    body('tatc', 'Enter a valid total asset turnover ratio'),
    body('sahc', 'Enter a valid sales and administrative cost ratio'),
    body('ycr', 'Enter a valid yield on capital ratio'),
    body('ntp', 'Enter a valid net cash flow'),
    body('pl', 'Enter a valid profit loss'),
    body('fc', 'Enter a valid fixed charges'),
    body('ce', 'Enter a valid current expenses'),
    body('upr', 'Enter a valid unpaid reserves'),
    body('pc', 'Enter a valid profit loss'),
    body('maqlc', 'Enter a valid market value of assets'),
    body('spr', 'Enter a valid sales per revenue'),
    body('fd', 'Enter a valid fixed debt'),
    body('ctd', 'Enter a valid current debt'),
    body('hpr', 'Enter a valid holding profit ratio'),
    body('pf', 'Enter a valid profit factor'),
    body('cs', 'Enter a valid cash conversion cycle')
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
            bp: req.body.bp,
            poa: req.body.poa,
            ip: req.body.ip,
            fs: req.body.fs,
            cc: req.body.cc,
            sector: req.body.sector,
            coapr: req.body.coapr,
            pfail: req.body.pfail,
            ctr: req.body.ctr,
            ml: req.body.ml,
            gmpc: req.body.gmpc,
            ypc: req.body.ypc,
            tatc: req.body.tatc,
            sahc: req.body.sahc,
            ycr: req.body.ycr,
            ntp: req.body.ntp,
            pl: req.body.pl,
            fc: req.body.fc,
            ce: req.body.ce,
            upr: req.body.upr,
            pc: req.body.pc,
            maqlc: req.body.maqlc,
            spr: req.body.spr,
            fd: req.body.fd,
            ctd: req.body.ctd,
            hpr: req.body.hpr,
            pf: req.body.pf,
            cs: req.body.cs,
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
        body('companyname').optional().isString(),
        body('director').optional().isString(),
        body('email').optional().isEmail(),
        body('phoneno').optional().isNumeric(),
        body('addressd').optional().isString(),
        body('addressc').optional().isString(),
        body('bp').optional().isString(),
        body('poa').optional().isString(),
        body('ip').optional().isString(),
        body('fs').optional().isString(),
        body('cc').optional().isString(),
        body('sector').optional().isString(),
        body('coapr').optional().isString(),
        body('pfail').optional().isString(),
        body('ctr').optional().isString(),
        body('ml').optional().isString(),
        body('gmpc').optional().isString(),
        body('ypc').optional().isString(),
        body('tatc').optional().isString(),
        body('sahc').optional().isString(),
        body('ycr').optional().isString(),
        body('ntp').optional().isString(),
        body('pl').optional().isString(),
        body('fc').optional().isString(),
        body('ce').optional().isString(),
        body('upr').optional().isString(),
        body('pc').optional().isString(),
        body('maqlc').optional().isString(),
        body('spr').optional().isString(),
        body('fd').optional().isString(),
        body('ctd').optional().isString(),
        body('hpr').optional().isString(),
        body('pf').optional().isString(),
        body('cs').optional().isString()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            // Validate ObjectId format
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                return res.status(400).json({ error: 'Invalid registration form ID' });
            }

            // Destructure the request body
            const {
                companyname, director, email, phoneno, addressc, addressd, bp, poa, ip, fs, cc, sector, coapr, pfail, ctr, ml, gmpc, ypc,
                tatc, sahc, ycr, ntp, pl, fc, ce, upr, pc, maqlc, spr, fd, ctd, hpr, pf, cs
            } = req.body;

            // Initialize the update object
            const updateRegistrationForm = {};
            if (companyname) updateRegistrationForm.companyname = companyname;
            if (director) updateRegistrationForm.director = director;
            if (email) updateRegistrationForm.email = email;
            if (phoneno) updateRegistrationForm.phoneno = phoneno;
            if (addressc) updateRegistrationForm.addressc = addressc;
            if (addressd) updateRegistrationForm.addressd = addressd;
            if (bp) updateRegistrationForm.bp = bp;
            if (poa) updateRegistrationForm.poa = poa;
            if (ip) updateRegistrationForm.ip = ip;
            if (fs) updateRegistrationForm.fs = fs;
            if (cc) updateRegistrationForm.cc = cc;
            if (sector) updateRegistrationForm.sector = sector;
            if (coapr) updateRegistrationForm.coapr = coapr;
            if (pfail) updateRegistrationForm.pfail = pfail;
            if (ctr) updateRegistrationForm.ctr = ctr;
            if (ml) updateRegistrationForm.ml = ml;
            if (gmpc) updateRegistrationForm.gmpc = gmpc;
            if (ypc) updateRegistrationForm.ypc = ypc;
            if (tatc) updateRegistrationForm.tatc = tatc;
            if (sahc) updateRegistrationForm.sahc = sahc;
            if (ycr) updateRegistrationForm.ycr = ycr;
            if (ntp) updateRegistrationForm.ntp = ntp;
            if (pl) updateRegistrationForm.pl = pl;
            if (fc) updateRegistrationForm.fc = fc;
            if (ce) updateRegistrationForm.ce = ce;
            if (upr) updateRegistrationForm.upr = upr;
            if (pc) updateRegistrationForm.pc = pc;
            if (maqlc) updateRegistrationForm.maqlc = maqlc;
            if (spr) updateRegistrationForm.spr = spr;
            if (fd) updateRegistrationForm.fd = fd;
            if (ctd) updateRegistrationForm.ctd = ctd;
            if (hpr) updateRegistrationForm.hpr = hpr;
            if (pf) updateRegistrationForm.pf = pf;
            if (cs) updateRegistrationForm.cs = cs;

            // Find and update the registration form
            let form = await RegistrationForm.findById(req.params.id);
            if (!form) {
                return res.status(404).json({ error: "Registration form not found" });
            }

            // Update the form and return the updated document
            form = await RegistrationForm.findByIdAndUpdate(req.params.id, { $set: updateRegistrationForm }, { new: true });

            res.status(200).json(form);

        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: "An internal server error occurred" });
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