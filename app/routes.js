const express = require('express')
const router = express.Router()

require('./routes/1-0/routes.js')(router);
require('./routes/1-1/routes.js')(router);
require('./routes/2-0/routes.js')(router);
require('./routes/3-0/routes.js')(router);
require('./routes/4-0/routes.js')(router);
require('./routes/4-1/routes.js')(router);
require('./routes/5-0/routes.js')(router);

// Employer started
router.get('/directEmployer', function (req, res) {
    res.redirect(`/1-0/registration/`)
    })


 // Provider started
router.get('/directProvider', function (req, res) {
    res.redirect(`/2-0/provider-led-registration/`)
    })


 // Employer finish
router.get('/employerFinish', function (req, res) {
    res.redirect(`/2-0/provider-led-registration/registration/provider-invitation-email`)
    })


// Interim homepage
    router.get('/interimHomepage', function (req, res) {
        res.redirect(`/1-0/registration/interim-homepage`)
    })
    


module.exports = router
