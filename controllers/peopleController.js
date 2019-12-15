const { validationResult } = require('express-validator');
var db = require ('../db/db');

// Database connection
db.connect('mongodb://localhost:27017', function (err) {
    if (err) {
        throw ('Fallo en la conexión con la BD');
    }
});


// Display all users
module.exports.users_list = function (req, res, next) {

    if (db.get() === null) {
        next(new Error('La conexión no está establecida'));
        return;
    }

    db.get().db('apidb').collection('users').find().toArray(function (err, result) {
        if (err) {
            next (new Error('Fallo en la conexión con la BD para listar'));
            return;
        } else {
            res.send(result);
        }
    });
};


// Create one user
module.exports.users_create = function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    if (db.get() === null) {
        next(new Error('La conexión no está establecida'));
        return;
    }

    const user = {};
    user.name = req.body.name;
    user.phone = req.body.phone;
    
    db.get().db('apidb').collection('users').insertOne(user, function (err, result) {
        if (err) {
            next (new Error('Fallo en la conexión con la BD al crear el usuario'));
            return;

        } else {
            res.send(result);
        }
    });
};


// Update users
module.exports.users_update_one = function (req, res, next) {
    if (db.get() === null) {
        next(new Error('La conexión no está establecida'));
        return;
    }

    const filter = {id: req.body.id};
    const update = {$set: {name: req.body.name, phone: req.body.phone}};

    db.get().db('apidb').collection('users').updateOne(filter, update, function(err, result) {
        if (err) {
            next(new Error('Fallo en la conexión con la BD al actualizar'));
            return;
        } else {
            res.send(result);
        }
    });
};

// Delete users
module.exports.users_delete_one = function (req, res, next) {
    if (db.get() === null) {
        next(new Error('La conexión no está establecida'));
        return;
    }

    const filter = {id: req.body.id};
    db.get().db('apidb').collection('users').deleteOne(filter, function(err, result) {
        if (err) {
            next(new Error('Fallo en la conexión con la BD al eliminar'));
            return
        } else {
            res.send(result);
        }
    });
};