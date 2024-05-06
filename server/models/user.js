const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "The username of the user is required."],
    unique: [true, "The username of the user has to be unique."],
    maxLength: [
      36,
      "The username of the user should be less than 36 characters.",
    ],
  },
  email: {
    type: String,
    required: [true, "The email of the user is required."],
    maxLength: [
      254,
      "The email of the username should be less than 254 characters.",
    ],
  },
  password: {
    type: String,
    required: [true, "The password of the user is required."],
    minLength: [
      8,
      "The password of the user should be longer than 8 characters.",
    ],
  },
  profilePicture: {
    type: String,
    default: "",
  },
  settings: {
    theme: {
      type: String,
      enum: {
        values: ["light", "dark"],
        message: "The {VALUE} is not supported.",
      },
      default: "",
    },
    displayEmail: {
      type: Boolean,
      default: false,
    },
    font: {
      type: String,
      default: "sans-serif",
    },
  },
  profile: {
    website: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    currentlyLearning: {
      type: String,
      default: "",
    },
    availableFor: {
      type: String,
      default: "",
    },
    skillsLanguages: {
      type: String,
      default: "",
    },
    work: {
      type: String,
      default: "",
    },
    education: {
      type: String,
      default: "",
    },
  },
});

userSchema.pre("save", function (next) {
  let user = this;

  if (!user.isModified("password")) {
    return next();
  }

  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return next(err);
      }

      user.password = hash;
      next();
    });
  });
});

/**
 * TODO: validate if we can use findbyidandupdate
 * this same method doesn't recognize that mongo query
 */
userSchema.pre("findOneAndUpdate", async function (next) {
  if (this._update.password !== undefined) {
    this._update.password = bcrypt.hashSync(
      this._update.password,
      SALT_WORK_FACTOR
    );
  }
  next();
});

userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return callback(err);
    }

    callback(null, isMatch);
  });
};

module.exports = mongoose.model("User", userSchema);
