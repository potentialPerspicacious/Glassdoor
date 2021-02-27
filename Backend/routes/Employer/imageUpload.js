  
const express = require("express");
const router = express.Router();
const multer = require('multer');
//const pool = require('../pool.js');
const path = require('path');
const fs = require('fs');
const itemStorage = multer.diskStorage ({
    destination: path.join(__dirname, '../..') + '/public/uploads/company',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({storage: itemStorage});

router.post("/company", upload.single("image"), (req, res) => {
    console.log(req);
    try {
        return res.status(201).json ({
            message: 'File uploaded successfully',
        })
    } catch (error) {
        console.log(error);
    }
});

router.get('/:filename', (req, res) => {
    console.log("hiii")
    const image = path.join(__dirname, '../..') + 
    '/public/uploads/company/' + 
    req.params.filename;
    console.log(image);

    if(fs.existsSync(image)) {
        res.sendFile(image);
    } else {
        res.sendFile(path.join(__dirname, '../..') + 
        '/public/uploads/company/' + 'companyPlaceholder.png')
    }
});

module.exports = router;