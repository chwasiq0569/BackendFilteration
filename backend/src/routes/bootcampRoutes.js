const router = require('express').Router();
const {getAllBootcamps, createNewBootcamp, updateBootcampById, deleteBootcampById} = require('../controllers/bootcampsControllers')

//@routes
//api/v1/bootcamps/'
router
    .route('/')
    .get(getAllBootcamps)
    .post(createNewBootcamp)
//api/v1/bootcamps/:id'
router
    .route('/:id')
    .put(updateBootcampById)
    .delete(deleteBootcampById)

module.exports = router