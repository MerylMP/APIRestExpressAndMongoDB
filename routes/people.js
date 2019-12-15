var express = require('express');
var router = express.Router();
var people_controller = require('../controllers/peopleController');
const { check } = require('express-validator');


// Validation rules array
const valid_user = [
  check('name', 'Error de nombre')
    .isLength({min: 3})
    .isAlpha(['es-ES'])
];

// CREATE User
router.post('/', valid_user, people_controller.users_create);

// READ all users / user
router.get('/', people_controller.users_list);
router.get('/:id', people_controller.getUserById);

// UPDATE user
router.put('/:id', valid_user, people_controller.users_update_one);

// DELETE user
router.delete('/:id', people_controller.users_delete_one);

module.exports = router;