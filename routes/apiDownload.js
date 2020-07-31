const express = require('express');
const router = express.Router();
const files = require('../controllers/Files');


router.post('/', async (req, res) => {
    let id = req.body.id;
    console.log("in downloads");
    console.log(id);
    //get file from database with id
    let file  = await files.get(id);
    if( file !== null)
       res.download(file[0].dataValues.path+file[0].dataValues.name);
});
module.exports = router;
