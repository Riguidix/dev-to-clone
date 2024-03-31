const User = require('../models/user');
const errorValidator = require('../util/errorValidator');

/**
 * Creates a new User
 * @param {Object} req 
 * @param {Object} res 
 */
exports.createUser = (req, res) => {
    try {
        let newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            profilePicture: `https://joesch.moe/api/v1/${ req.body.username }`,
            website: req.body.website,
            bio: req.body.bio
        });

        newUser.save()
            .then(() => {
                res.status(200).json({
                    success: true,
                    message: "El usuario se ha creado correctamente."
                });
            })
            .catch((error) => {
                let validationErrors = errorValidator(error);

                if (validationErrors) {
                    res.status(400).json({
                        success: false,
                        message: "La creación del usuario tiene problemas de validación.",
                        errors: validationErrors
                    });
                    return;
                }

                res.status(400).json({
                    success: false,
                    message: "Hubo un error al crear el usuario."
                });
            });
    } catch (error) {
        res.status(500).json({
            message: "Hubo un error en el servidor.",
            success: false
        });
    }
}

/**
 * Find all Users
 * @param {Object} req 
 * @param {Object} res 
 */
exports.readUsers = (req, res) => {
    try {
        User.find({})
            .then(users => {
                if (users.length === 0 || users === null) {
                    res.status(200).json({
                        success: true,
                        message: "No se encontraron usuarios para listar.",
                        data: users
                    });
                    return;
                }

                res.status(200).json({
                    success: true,
                    message: "Los usuarios se listaron correctamente.",
                    data: users
                });
            })
            .catch(error => {
                res.status(400).json({
                    success: false,
                    message: "Hubo un error al listar los usuarios."
                });
            });
    } catch (error) {
        res.status(500).json({
            message: "Hubo un error en el servidor.",
            success: false
        });
    }
}