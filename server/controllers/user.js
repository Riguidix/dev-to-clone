const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const User = require('../models/user');
const errorValidator = require('../util/errorValidator');

/**
 * Login an User
 * @param {Object} req 
 * @param {Object} res 
 */
exports.login = (req, res) => {
    try {
        User.findOne({ username: req.body.username })
            .then(user => {
                if (user === null) {
                    res.status(200).json({
                        success: true,
                        message: "El usuario y/o contraseña son incorrectos",
                        data: []
                    });
                    return;
                }

                user.comparePassword(req.body.password, function (error, isMatch) {
                    if (error || !isMatch) {
                        res.status(200).json({
                            success: true,
                            message: "El usuario y/o contraseña son incorrectos",
                            data: []
                        });
                        return;
                    } else {
                        res.status(200).json({                           
                            success: true,
                            token: jwt.sign({
                                id: user.id,
                                user: user.username
                            }, process.env.SECRET_TOKEN),
                            message: "El usuario ha ingresado correctamente.",

                        });
                    }
                });
            })
            .catch(error => {
                res.status(400).json({
                    success: false,
                    message: "Hubo un error al ingresar el usuario."
                });
            });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Hubo un error en el servidor."
        });
    }
}

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
            success: false,
            message: "Hubo un error en el servidor."
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
            .select('-password')
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
            success: false,
            message: "Hubo un error en el servidor."
        });
    }
}

/**
 * Find an User by ID
 * @param {Object} req 
 * @param {Object} res
 * @param {ObjecID} id 
 */
exports.readUserById = (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            res.status(400).json({
                success: false,
                message: "El identificador del Usuario tiene problemas de validación.",
                errors: ["El tipo del identificador id es incorrecto."]
            });
            return;
        }

        User.findById(req.params.id)
            .select('-password')
            .then(user => {
                if (user === null) {
                    res.status(200).json({
                        success: true,
                        message: "No se encontraron usuarios con ese identificador para listar.",
                        data: []
                    });
                    return;
                }

                res.status(200).json({
                    success: true,
                    message: "El usuario se listo correctamente.",
                    data: user
                });
            })
            .catch(error => {
                res.status(400).json({
                    success: false,
                    message: "Hubo un error al listar el usuario."
                });
            });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Hubo un error en el servidor."
        });
    }
}

/**
 * Find an User by ID amd Update
 * @param {Object} req 
 * @param {Object} res
 * @param {ObjecID} id 
 */
exports.updateUser = (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            res.status(400).json({
                success: false,
                message: "El identificador del Usuario tiene problemas de validación.",
                errors: ["El tipo del identificador id es incorrecto."]
            });
            return;
        }

        let updateUser = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            profilePicture: `https://joesch.moe/api/v1/${ req.body.username }`,
            website: req.body.website,
            bio: req.body.bio
        }

        User.findOneAndUpdate({ _id: req.params.id }, updateUser, { runValidators: true, new: true })
            .then(user => {
                if (user === null) {
                    res.status(200).json({
                        success: true,
                        message: "No se encontraron usuarios con ese identificador para actualizar.",
                        data: []
                    });
                    return;
                }

                res.status(200).json({
                    success: true,
                    message: "El usuario se ha actualizado correctamente.",
                    data: user
                });
            })
            .catch(error => {
                let validationErrors = errorValidator(error);

                if (validationErrors) {
                    res.status(400).json({
                        success: false,
                        message: "La actualización del usuario tiene problemas de validación.",
                        errors: validationErrors
                    });
                    return;
                }

                res.status(400).json({
                    success: false,
                    message: "Hubo un error al actualizar el usuario."
                });
            });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Hubo un error en el servidor."
        });
    }
}

/**
 * Find an User by ID and Update his password
 * @param {Object} req 
 * @param {Object} res
 * @param {ObjecID} id 
 */
exports.updateUserPass = (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            res.status(400).json({
                success: false,
                message: "El identificador del Usuario tiene problemas de validación.",
                errors: ["El tipo del identificador id es incorrecto."]
            });
            return;
        }

        let updatePassword = { password: req.body.password }

        User.findOneAndUpdate({ _id: req.params.id }, updatePassword , { new: true })
            .then(user => {
                if (user === null) {
                    res.status(200).json({
                        success: true,
                        message: "No se encontraron usuarios con ese identificador para actualizar.",
                        data: []
                    });
                    return;
                }

                res.status(200).json({
                    success: true,
                    message: "La contraseña del usuario se ha actualizado correctamente.",
                    data: user
                });
            })
            .catch(error => {
                if (req.body.password === undefined || req.body.password.length < 8) {
                    res.status(400).json({
                        success: false,
                        message: "La contraseña es requerida para su actualiación.",
                        errors: ["Hubo un error al actualizar la contraseña"]
                    });
                    return;
                }

                res.status(400).json({
                    success: false,
                    message: "Hubo un error al actualizar el usuario."
                });
            });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Hubo un error en el servidor."
        });
    }
}

/**
 * Find an User by ID and Delete
 * @param {Object} req 
 * @param {Object} res
 * @param {ObjecID} id 
 */
exports.deleteUser = (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            res.status(400).json({
                success: false,
                message: "El identificador del Usuario tiene problemas de validación.",
                errors: ["El tipo del identificador id es incorrecto."]
            });
            return;
        }

        User.findByIdAndDelete(req.params.id)
            .then(() => {
                res.status(200).json({
                    success: true,
                    message: "El usuario se ha eliminado correctamente."
                });
            })
            .catch(error => {
                res.status(400).json({
                    success: false,
                    message: "Hubo un error al eliminar el usuario."
                });
            });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Hubo un error en el servidor."
        });
    }
}
