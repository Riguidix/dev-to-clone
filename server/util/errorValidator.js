const mongoose = require("mongoose");

const mongooseValidation = (error) => {
  if (error.code === 11000) {
    let errorKey = Object.keys(error.keyPattern);

    return [`El atributo ${errorKey[0]} ya existe.`];
  }

  if (error instanceof mongoose.Error.ValidationError) {
    let errors = [];
    let errorKeys = Object.keys(error.errors);

    for (let i = 0; i < errorKeys.length; i++) {
      errors.push(error.errors[errorKeys[i]].properties.message);
    }

    return errors;
  }
};

module.exports = mongooseValidation;
