const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const errorValidator = require("../utils/errorValidator");

/**
 * Login an User
 * @param {Object} req
 * @param {Object} res
 */
exports.login = (req, res) => {
  try {
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (user === null) {
          res.status(200).json({
            success: true,
            message: "Oops. The email or password you entered doesn't match. Try again!",
            data: [],
          });
          return;
        }

        user.comparePassword(req.body.password, function (error, isMatch) {
          if (error || !isMatch) {
            res.status(200).json({
              success: true,
              message: "Oops. The email or password you entered doesn't match. Try again!",
              data: [],
            });
            return;
          } else {
            res.status(200).json({
              success: true,
              token: jwt.sign(
                {
                  id: user.id,
                  user: user.username,
                  theme: user.settings.theme
                },
                process.env.SECRET_TOKEN
              ),
              message: "The user has sign in successfully.",
            });
          }
        });
      })
      .catch((error) => {
        res.status(400).json({
          success: false,
          message: "There's an error while sign in.",
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
 * Creates a new User
 * @param {Object} req
 * @param {Object} res
 */
exports.createUser = (req, res) => {
  try {
    let newUser = new User({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      profilePicture: `https://joesch.moe/api/v1/${req.body.username}`,
    });

    newUser
      .save()
      .then(() => {
        res.status(200).json({
          success: true,
          message: "The user was created successfully.",
        });
      })
      .catch((error) => {
        let validationErrors = errorValidator(error);

        if (validationErrors) {
          res.status(400).json({
            success: false,
            message: "The creation of the user has the next validation errors.",
            errors: validationErrors,
          });
          return;
        }

        res.status(400).json({
          success: false,
          message: "There's an error while creating the user.",
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
 * Find all Users
 * @param {Object} req
 * @param {Object} res
 */
exports.readUsers = (req, res) => {
  try {
    User.find({})
      .select("-password")
      .then((users) => {
        if (users.length === 0 || users === null) {
          res.status(200).json({
            success: true,
            message: "There's no users to list.",
            data: users,
          });
          return;
        }

        res.status(200).json({
          success: true,
          message: "The user was retrieved successfully.",
          data: users,
        });
      })
      .catch((error) => {
        res.status(400).json({
          success: false,
          message: "There's an error while retrieving the users.",
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
        message: "The user identificator has some validation errors.",
        errors: ["The type of ID is incorrect."],
      });
      return;
    }

    User.findById(req.params.id)
      .select("-password")
      .then((user) => {
        if (user === null) {
          res.status(200).json({
            success: true,
            message: "There's no users to retrieve with that identificator.",
            data: [],
          });
          return;
        }

        res.status(200).json({
          success: true,
          message: "The user was retrieved successfully.",
          data: user,
        });
      })
      .catch((error) => {
        res.status(400).json({
          success: false,
          message: "There's an error while retrieving the user.",
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
 * Find an User by ID and Update
 * @param {Object} req
 * @param {Object} res
 * @param {ObjecID} id
 */
exports.updateUser = (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      res.status(400).json({
        success: false,
        message: "The user identificator has some validation errors.",
        errors: ["The type of ID is incorrect."],
      });
      return;
    }

    let updateUser = {
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      profilePicture: req.body.username ? `https://joesch.moe/api/v1/${req.body.username}` : undefined,
      settings: {
        theme: req.body.theme,
        displayEmail: req.body.displayEmail,
        font: req.body.font
      },
      profile: {
        website: req.body.website,
        location: req.body.location,
        bio: req.body.bio,
        currentlyLearning: req.body.currentlyLearning,
        availableFor: req.body.availableFor,
        skillsLanguages: req.body.skillsLanguages,
        work: req.body.work,
        education: req.body.education
      }
    };

    User.findOneAndUpdate({ _id: req.params.id }, updateUser, {
      runValidators: true,
      new: true,
    })
      .then((user) => {
        if (user === null) {
          res.status(200).json({
            success: true,
            message: "There's no users to retrieve with that identificator to update.",
            data: [],
          });
          return;
        }

        res.status(200).json({
          success: true,
          message: "The user was updated successfully.",
          data: user,
        });
      })
      .catch((error) => {
        let validationErrors = errorValidator(error);

        if (validationErrors) {
          res.status(400).json({
            success: false,
            message: "The update of the user has the next validation errors.",
            errors: validationErrors,
          });
          return;
        }

        res.status(400).json({
          success: false,
          message: "There's an error while updating the user.",
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
        message: "The user identificator has some validation errors.",
        errors: ["The type of ID is incorrect."],
      });
      return;
    }

    let updatePassword = { password: req.body.password };

    User.findOneAndUpdate({ _id: req.params.id }, updatePassword, { new: true })
      .select("-password")
      .then((user) => {
        if (user === null) {
          res.status(200).json({
            success: true,
            message: "There's no users to retrieve with that identificator to update.",
            data: [],
          });
          return;
        }

        res.status(200).json({
          success: true,
          message: "The password of the user was updated successfully.",
          data: user,
        });
      })
      .catch((error) => {
        if (req.body.password === undefined || req.body.password.length < 8) {
          res.status(400).json({
            success: false,
            message: "The password is required to update on user.",
            errors: ["The password is required to update"],
          });
          return;
        }

        res.status(400).json({
          success: false,
          message: "There's an error while updating the user.",
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
 * Find an User by ID and Update the following
 * @param {Object} req
 * @param {Object} res
 * @param {ObjecID} id
 */
exports.updateFollowing = (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.body.fromID)) {
      res.status(400).json({
        success: false,
        message: "The user identificator has some validation errors.",
        errors: ["The type of ID is incorrect."],
      });
      return;
    }

    if (!mongoose.isValidObjectId(req.body.toID)) {
      res.status(400).json({
        success: false,
        message: "The user identificator has some validation errors.",
        errors: ["The type of ID is incorrect."],
      });
      return;
    }

    if (req.body.fromID === req.body.toID) {
      res.status(400).json({
        success: false,
        message: "You can't follow this account",
        errors: ["Can't follow yourself."],
      });
      return;
    }

    User.findOneAndUpdate(
      { _id: req.body.fromID },
      { $addToSet: { following: req.body.toID } },
      { new: true }
    )
      .then((userFrom) => {
        if (userFrom === null) {
          res.status(200).json({
            success: true,
            message: "There's no users to retrieve with that identificator to update.",
            data: [],
          });
          return;
        }

        User.findOneAndUpdate(
          { _id: req.body.toID },
          { $addToSet: { followers: req.body.fromID } },
          { new: true }
        )
          .then((userTo) => {
            if (userTo === null) {
              res.status(200).json({
                success: true,
                message: "There's no users to retrieve with that identificator to update.",
                data: [],
              });
              return;
            }

            res.status(200).json({
              success: true,
              message: "The follow was updated successfully.",
              users: {
                userFrom,
                userTo,
              },
            });
          })
          .catch((error) => {
            res.status(400).json({
              success: false,
              message: "There's an error while updating the user.",
            });
          });
      })
      .catch((error) => {
        console.error(error);
        res.status(400).json({
          success: false,
          message: "There's an error while updating the user.",
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
 * Find an User by ID and Delete
 * @param {Object} req
 * @param {Object} res
 * @param {ObjecID} id
 */
exports.updateUnfollow = (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.body.fromID)) {
      res.status(400).json({
        success: false,
        message:
          "El identificador del Usuario que quiere seguir tiene problemas de validación.",
        errors: ["El tipo del identificador id es incorrecto."],
      });
      return;
    }

    if (!mongoose.isValidObjectId(req.body.toID)) {
      res.status(400).json({
        success: false,
        message:
          "El identificador del Usuario a seguir tiene problemas de validación.",
        errors: ["El tipo del identificador id es incorrecto."],
      });
      return;
    }

    User.findOneAndUpdate(
      { _id: req.body.fromID },
      { $pull: { following: req.body.toId } },
      { new: true }
    )
      .then((userFrom) => {
        if (userFrom === null) {
          res.status(200).json({
            success: true,
            message:
              "No se encontraron users con ese identificador para actualizar.",
            data: [],
          });
          return;
        }

        User.findOneAndUpdate(
          { _id: req.body.toID },
          { $pull: { followers: req.body.fromID } },
          { new: true }
        )
          .then((userTo) => {
            if (userTo === null) {
              res.status(200).json({
                success: true,
                message:
                  "No se encontraron users con ese identificador para actualizar.",
                data: [],
              });
              return;
            }

            res.status(200).json({
              success: true,
              message: "El unfollow se actualizo correctamente.",
              users: {
                userFrom,
                userTo,
              },
            });
          })
          .catch((error) => {
            res.status(400).json({
              success: false,
              message: "Hubo un error al actualizar el usuario a seguir.",
              error: ["Hubo un error al actualizar el usuario a seguir."],
            });
          });
      })
      .catch((error) => {
        res.status(400).json({
          success: false,
          message: "Hubo un error al actualizar el usuario a seguir.",
          error: ["Hubo un error al actualizar el usuario que sigue."],
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
        errors: ["El tipo del identificador id es incorrecto."],
      });
      return;
    }

    User.findByIdAndDelete(req.params.id)
      .then(() => {
        res.status(200).json({
          success: true,
          message: "El usuario se ha eliminado correctamente.",
        });
      })
      .catch((error) => {
        res.status(400).json({
          success: false,
          message: "Hubo un error al eliminar el usuario.",
        });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Hubo un error en el servidor.",
    });
  }
};
