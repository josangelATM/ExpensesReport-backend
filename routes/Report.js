const Report = require('../controllers/Report')
const express = require('express')
const router = express.Router()


router.route('/')
    .get(Report.getAll)
    .post(Report.add)

router.route('/search')
    .get(Report.search)

router.route('/:ID')
    .get(Report.getByID)
    .delete(Report.delete)
    .patch(Report.update)


module.exports = router;


