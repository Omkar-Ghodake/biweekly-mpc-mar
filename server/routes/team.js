const express = require('express')
const {
    updateTeam,
    getTeam, addTeam
} = require('../controllers/TeamController.js')
const router = express.Router()
const upload = require('../middleware/multer.middleware.js')

router.get('/getTeam', getTeam)
router.patch('/updateTeam',
    upload.fields([
        { name: 'logo', maxCount: 1 },
        { name: 'display_picture', maxCount: 1 }
    ]),
    updateTeam
);
router.post('/addTeam',
    upload.fields([
        { name: 'logo', maxCount: 1 },
        { name: 'display_picture', maxCount: 1 }
    ]),
    addTeam
);

module.exports = router
