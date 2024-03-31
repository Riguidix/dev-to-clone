const mongoose = require("mongoose");

const mongooseValidation = (error) => {	
	if (error instanceof mongoose.Error.ValidationError) {
		let errors = [];
		let errorKeys = Object.keys(error.errors);

		for (let i = 0; i < errorKeys.length; i++) {
			errors.push(error.errors[errorKeys[i]].properties.message);
		}

		return errors;
	}
}

module.exports = mongooseValidation;
