const mongoose = require("mongoose");
const Post = require("../models/post");
const User = require("../models/user");

const errorValidator = require("../utils/errorValidator");

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
        message: "The author identificator has some validation errors.",
        errors: ["The type of ID is incorrect."],
      });
      return;
    }

    let newPost = new Post({
      title: req.body.title,
      content: req.body.content,
      backgroundImage: req.body.backgroundImage,
      author: req.body.author,
    });

    newPost
      .save()
      .then((post) => {
        User.findById(req.body.author)
          .then((user) => {
            user.posts.push(post);

            user
              .save()
              .then((user) => {
                res.status(200).json({
                  success: true,
                  message: "The post was created successfully.",
                });
              })
              .catch((error) => {
                res.status(200).json({
                  success: true,
                  message: "There was an error while creating the post.",
                });
              });
          })
          .catch((error) => {
            res.status(200).json({
              success: true,
              message:
                "There was an error while retrieving the user to create post.",
            });
          });
      })
      .catch((error) => {
        let validationErrors = errorValidator(error);

        if (validationErrors) {
          res.status(400).json({
            success: false,
            message: "The creation of post have the next validation errors.",
            errors: validationErrors,
          });
          return;
        }

        res.status(400).json({
          success: false,
          message: "There was an error while creating the post.",
        });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "There's an error on the server.",
    });
  }
};

/**
 * Read all Posts
 * @param {Object} req
 * @param {Object} res
 */
exports.readPosts = (req, res) => {
  try {
    Post.find({})
      .then((posts) => {
        if (posts.length === 0 || posts === null) {
          res.status(200).json({
            success: true,
            message: "No se encontraron posts para listar.",
            data: posts,
          });
          return;
        }

        res.status(200).json({
          success: true,
          message: "Los usuarios se listaron correctamente.",
          data: posts,
        });
      })
      .catch((error) => {
        res.status(400).json({
          success: false,
          message: "Hubo un error al listar los posts.",
        });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Hubo un error en el servidor.",
    });
  }
};

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
        errors: ["El tipo del identificador id es incorrecto."],
      });
      return;
    }

    Post.findById(req.params.id)
      .then((post) => {
        if (post === null) {
          res.status(200).json({
            success: true,
            message:
              "No se encontraron posts con ese identificador para listar.",
            data: [],
          });
          return;
        }

        res.status(200).json({
          success: true,
          message: "El post se listo correctamente.",
          data: post,
        });
      })
      .catch((error) => {
        res.status(400).json({
          success: false,
          message: "Hubo un error al listar el usuario.",
        });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Hubo un error en el servidor.",
    });
  }
};

/**
 * Find a Post by ID and Update
 * @param {Object} req
 * @param {Object} res
 */
exports.updatePost = (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      res.status(400).json({
        success: false,
        message: "El identificador del Post tiene problemas de validación.",
        errors: ["El tipo del identificador id es incorrecto."],
      });
      return;
    }

    let updatePost = {
      title: req.body.title,
      content: req.body.content,
      backgroundImage: req.body.backgroundImage,
      author: req.body.author,
    };

    Post.findByIdAndUpdate(req.params.id, updatePost, {
      runValidators: true,
      new: true,
    })
      .then((post) => {
        if (post === null) {
          res.status(200).json({
            success: true,
            message:
              "No se encontraron posts con ese identificador para actualizar.",
            data: [],
          });
          return;
        }

        res.status(200).json({
          success: true,
          message: "El post se ha actualizado correctamente.",
          data: post,
        });
      })
      .catch((error) => {
        let validationErrors = errorValidator(error);

        if (validationErrors) {
          res.status(400).json({
            success: false,
            message: "La actualización del post tiene problemas de validación.",
            errors: validationErrors,
          });
          return;
        }

        res.status(400).json({
          success: false,
          message: "Hubo un error al actualizar el post.",
        });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Hubo un error en el servidor.",
    });
  }
};

/**
 * Find a Post by ID and Push a Comment
 * @param {Object} req
 * @param {Object} res
 */
exports.updatePostComment = (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      res.status(400).json({
        success: false,
        message: "El identificador del Post tiene problemas de validación.",
        errors: ["El tipo del identificador id es incorrecto."],
      });
      return;
    }

    let newComment = {
      user: req.body.user,
      comment: req.body.comment,
    };

    Post.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { comments: newComment } },
      { runValidators: true, new: true }
    )
      .then((post) => {
        if (post === null) {
          res.status(200).json({
            success: true,
            message:
              "No se encontraron posts con ese identificador para actualizar.",
            data: [],
          });
          return;
        }

        res.status(200).json({
          success: true,
          message: "El comentario post se ha actualizado correctamente.",
          data: post,
        });
      })
      .catch((error) => {
        res.status(400).json({
          success: false,
          message: "Hubo un error al actualizar el comentario del post.",
        });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Hubo un error en el servidor.",
    });
  }
};

/**
 * Find a Post by ID and Push a like
 * @param {Object} req
 * @param {Object} res
 */
exports.updatePostLikes = (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      res.status(400).json({
        success: false,
        message: "El identificador del Post tiene problemas de validación.",
        errors: ["El tipo del identificador id es incorrecto."],
      });
      return;
    }

    if (!mongoose.isValidObjectId(req.body.user)) {
      res.status(400).json({
        success: false,
        message: "El identificador del Usuario tiene problemas de validación.",
        errors: ["El tipo del identificador id es incorrecto."],
      });
      return;
    }

    Post.findByIdAndUpdate(
      req.params.id,
      { $push: { likes: req.body.user } },
      { runValidators: true, new: true }
    )
      .then((post) => {
        if (post === null) {
          res.status(200).json({
            success: true,
            message:
              "No se encontraron posts con ese identificador para actualizar.",
            data: [],
          });
          return;
        }

        res.status(200).json({
          success: true,
          message: "El like del post se ha actualizado correctamente.",
          data: post,
        });
      })
      .catch((error) => {
        res.status(400).json({
          success: false,
          message: "Hubo un error al actualizar el comentario del post.",
        });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Hubo un error en el servidor.",
    });
  }
};

/**
 * Find a Post by ID and Delete
 * @param {Object} req
 * @param {Object} res
 */
exports.deletePost = (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      res.status(400).json({
        success: false,
        message: "El identificador del Post tiene problemas de validación.",
        errors: ["El tipo del identificador id es incorrecto."],
      });
      return;
    }

    Post.findByIdAndDelete(req.params.id)
      .then(() => {
        res.status(200).json({
          success: true,
          message: "El post se ha eliminado correctamente.",
        });
      })
      .catch((error) => {
        res.status(400).json({
          success: false,
          message: "Hubo un error al eliminar el post.",
        });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Hubo un error en el servidor.",
    });
  }
};
