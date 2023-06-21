const express = require('express');
const reachModel = require('../Models/Reach');
const router = express.Router();

// POST : User Message (/v1/reachus/details) 
router.post('/details', async (req, res) => {
    const { fullName, email, message } = req.body;

    if (!fullName || !email) {
        return res.json({
            success : false,
            message : 'Required Empty!'
        });
    }

    const newReachMessage = {
        fullName, email, message
    }

    reachModel.create(newReachMessage).then(() => {
        return res.json({
            success : true,
            message : "We got your message, Reach you soon!"
        })
    }).catch(() => {
        return res.json({
            success : false,
            message : "Oops! Can't send your Message."
        })
    })
})

module.exports = router;