const mongoose = require('mongoose');
const Post = require('../models/post');

const errorValidator = require('../util/errorValidator');

/**
 * Create a Post
 * @param {Object} req 
 * @param {Object} res 
 */
exports.createPost = (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.body.author)) {
            res.status(400).json({
                success: false,
                message: "El identificador del autor del post tiene problemas de validación.",
                errors: ["El tipo del identificador author es incorrecto."]
            });
            return;
        }

        let newPost = new Post({
            title: req.body.title,
            content: req.body.content,
            backgroundImage: req.body.backgroundImage,
            author: req.body.author
        });

        newPost.save()
            .then(() => {
                res.status(200).json({
                    success: true,
                    message: "El post se ha creado correctamente."
                });
            })
            .catch((error) => {
                let validationErrors = errorValidator(error);

                if (validationErrors) {
                    res.status(400).json({
                        success: false,
                        message: "La creación del post tiene problemas de validación.",
                        errors: validationErrors
                    });
                    return
                }

                res.status(400).json({
                    success: false,
                    message: "Hubo un error al crear el post."
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
 * Read all Posts
 * @param {Object} req 
 * @param {Object} res 
 */
exports.readPosts = (req, res) => {
    try {
        Post.find({})
            .then(posts => {
                if (posts.length === 0 || posts === null) {
                    res.status(200).json({
                        success: true,
                        message: "No se encontraron posts para listar.",
                        data: posts
                    });
                    return;
                }

                res.status(200).json({
                    success: true,
                    message: "Los usuarios se listaron correctamente.",
                    data: posts
                });
            })
            .catch(error => {
                res.status(400).json({
                    success: false,
                    message: "Hubo un error al listar los posts."
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
 * Read a Post by ID
 * @param {Object} req 
 * @param {Object} res 
 */
exports.readPostById = (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            res.status(400).json({
                success: false,
                message: "El identificador del Post tiene problemas de validación.",
                errors: ["El tipo del identificador id es incorrecto."]
            });
            return;
        }

        Post.findById(req.params.id)
            .then(post => {
                if (post === null) {
                    res.status(200).json({
                        success: true,
                        message: "No se encontraron posts con ese identificador para listar.",
                        data: []
                    });
                    return;
                }

                res.status(200).json({
                    success: true,
                    message: "El post se listo correctamente.",
                    data: post
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