var express = require('express');
var router = express.Router();
var people_controller = require('../controllers/peopleController');
const { check } = require('express-validator');


// Validation rules array
const valid_user = [
  check('name', 'Error de nombre')
    .isLength({ min: 3 })
    .isAlpha(['es-ES']),
  check('phone', 'Error de teléfono')
    .isLength({ min: 7, max: 10 })
    .isMobilePhone()
];

// POST create user
router.post('/', valid_user, people_controller.users_create);

// GET users listing
router.get('/', people_controller.users_list);

// PUT update user
router.put('/:id', valid_user, people_controller.users_update_one);

// DELETE user
router.delete('/:id', people_controller.users_delete_one);

module.exports = router;