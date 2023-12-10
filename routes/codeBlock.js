// const express = require('express');
// const codeBlocks = require('../extensions/code_blocks.js');
// const db = require('../db.js');

// const router = express.Router()

// router.get("/", (req, res) => {
//     const selectQuery = "SELECT * FROM moveo"
//     db.query(selectQuery, (err, data) => {
//         if(err) {
//             return res.status(500).send(err)
//         }
//         return res.json(data)
//     })
// })

// module.exports = router;


const express = require('express');
const db = require('../db.js');

const router = express.Router();

router.get("/", (req, res) => {
    const selectQuery = "SELECT * FROM moveo";

    db.all(selectQuery, (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.json(data);
    });
});

module.exports = router;
