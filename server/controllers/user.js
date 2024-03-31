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
                    exito: true,
                    msg: "El usuario se ha creado correctamente."
                });
            })
            .catch((error) => {
                let validationErrors = errorValidator(error);

                if (validationErrors) {
                    res.status(400).json({
                        exito: false,
                        msg: "La creación del usuario tiene problemas de validación.",
                        errors: validationErrors
                    });
                    return;
                }

                res.status(400).json({
                    exito: false,
                    msg: "Hubo un error al crear el usuario."
                });
            });
    } catch (error) {
        res.status(500).json({
            message: "Hubo un error en el servidor.",
            success: false
        });
    }
}