const express = require('express');
const router = express.Router();
const files = require('../controllers/Files');
const multer = require('multer');
const path = require('path');
const shortid = require('shortid');

let filename = "";
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './files/doc');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        filename = shortid.generate()+path.extname(file.originalname);
        cb(null, filename);
    }
});

router.post('/', (req, res) => {
    // 'file_name' is the name of our file input field in the HTML form
    let upload = multer({ storage: storage}).single('file_name');

    upload(req, res, async function(err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any
        let response = {
            status : "failure",
            values : {
                message : "Upload Failed",
                filename : filename
            }
        }
        if (err) {
            response.values.message = err;
            return res.send(response);
        }
        else if (!req.file) {
            response.values.message = 'Please select a file to upload';
            return res.send(response);
        }
        else if (err instanceof multer.MulterError) {
            response.values.message = err;
            return res.send(response);
        }

        //add file to database
        let data = await files.add({
            name : filename,
            path : "./files/doc/"
        });

        if(data !== 'error') {
            response.status = "success";
            response.values.message = "Upload Successfull";
            response.values.id = data.id;
        }
        else {
            response.status = "failure";
        }

        res.send(response);
    });
});
module.exports = router;
