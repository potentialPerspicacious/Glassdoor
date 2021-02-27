const express = require("express");
const router = express.Router();
const path = require('path');
const fs = require('fs');


router.get('/student/:user_image', (req, res) => {
    console.log(req.params.user_image)
    var image = path.join(__dirname, '..') + '/public/uploads/users/' + req.params.user_image;
    if (fs.existsSync(image)) {
        res.sendFile(image);
    }
    else {
        res.sendFile(path.join(__dirname, '..') + '/public/uploads/student/studentPlaceholder.png')
    }
});


module.exports = router;